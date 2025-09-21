"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type Resolver, type SubmitHandler } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {subjects} from "@/constants";
import {Textarea} from "@/components/ui/textarea";
import {createCompanion} from "@/lib/actions/companion.actions";
import {redirect} from "next/navigation";

// schema (declared first)
const formSchema = z.object({
    name: z.string().min(1, { message: "Companion is required." }).max(80),
    subject: z.string().min(1, { message: "Subject is required." }).max(80),
    topic: z.string().min(1, { message: "Topic is required." }).max(80),
    voice: z.string().min(1, { message: "Voice is required." }).max(80),
    style: z.string().min(1, { message: "Style is required." }).max(80),
    // we want the final value to be a number; z.coerce converts input to number
    duration: z.coerce
        .number()
        .min(1, { message: "Duration is required." })
        .max(80),
})

// post-validation (output) type
type CompanionFormValues = z.output<typeof formSchema>

// Cast the resolver to the exact Resolver type for CompanionFormValues.
// This avoids the mismatch where zodResolver's inferred types use the "input" type
// (which for z.coerce fields may be `unknown`) while useForm expects the output type.
const resolver = zodResolver(formSchema) as Resolver<CompanionFormValues>

const CompanionForm = () => {
    const form = useForm<CompanionFormValues>({
        resolver,
        defaultValues: {
            name: "",
            subject: "",
            topic: "",
            voice: "",
            style: "",
            duration: 15,
        },
    })

   const onSubmit = async  (values: z.infer<typeof formSchema>) => {
        const companion = await createCompanion(values);

        if(companion) {
            redirect(`/companions/${companion.id}`);
        } else {
            console.log('Failed to create a companion');
            redirect('/')
        }
   }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Companion Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter the companion name"
                                       {...field}
                                    className={"input"}

                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                                <Select
                                onValueChange={field.onChange}
                                value={field.value}
                                defaultValue={field.value}
                                >
                                    <SelectTrigger className="input capitalize">
                                        <SelectValue placeholder="Select the subject" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {subjects.map((subject) => (
                                            <SelectItem
                                                value={subject}
                                                key = {subject}
                                                className={"capitalize"}
                                            >
                                                {subject}
                                            </SelectItem>
                                            ))}
                                        </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="topic"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>What should the companion help with?</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Ex. Derivatives & Integrals"
                                    {...field}
                                    className={"input"}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="voice"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Voice</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger className="input">
                                        <SelectValue placeholder="Select the voice" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={"male"}>
                                            Male
                                        </SelectItem>
                                        <SelectItem value={"female"}>
                                            Female
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="style"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Style</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger className="input">
                                        <SelectValue
                                            placeholder="Select the style"
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={"formal"}>
                                            Formal
                                        </SelectItem>
                                        <SelectItem value={"casual"}>
                                            Casual
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Estimated session duration in minutes</FormLabel>
                            <FormControl>
                                <Input
                                    type = "number"
                                    placeholder="Enter the companion name"
                                    {...field}
                                    className={"input"}

                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Add other fields (subject, topic, voice, style, duration) the same way */}
                <Button type="submit" className={"w-full cursor-pointer"}>Build Your Companion</Button>
            </form>
        </Form>
    )
}
export default CompanionForm
