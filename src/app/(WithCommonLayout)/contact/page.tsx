/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FieldValues, useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { emailValidationSchema } from '@/validations/email';
import emailjs from '@emailjs/browser';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { LoaderPinwheel } from 'lucide-react';

export default function ContactPage() {
  const form = useForm({ resolver: zodResolver(emailValidationSchema) });

  const {
    formState: { isSubmitting },
    reset,
  } = form;

  // const {
  //   register,
  //   handleSubmit,
  //   reset,
  //   formState: { isSubmitting },
  // } = useForm({
  //   resolver: zodResolver(emailValidationSchema),
  // });

  const onSubmit = async (data: FieldValues) => {
    const { name, email, subject, message } = data;

    const serviceID = process.env.NEXT_PUBLIC_Service_ID as string;
    const templateID = process.env.NEXT_PUBLIC_Template_ID as string;
    const publicKey = process.env.NEXT_PUBLIC_Public_Key as string;

    const templateParams: Record<string, unknown> = {
      from_name: name,
      from_email: email,
      to_name: 'Khaled Siddique',
      subject,
      message,
    };

    try {
      await emailjs.send(serviceID, templateID, templateParams, publicKey);
      toast.success("Thank you. We'll get back to you as soon as possible.");
      reset();
    } catch (error) {
      toast.error('Ahh, something went wrong. Please try again.');
    }
  };

  const socialLinks = [
    {
      name: 'Twitter',
      url: 'https://x.com/mdkhaledsshuvo',
      icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/khaledssbd',
      icon: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/mdkhaledsshuvo',
      icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z',
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/mdkhaledsshuvo',
      icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
    },
  ];

  return (
    <div className="my-8 md:my-16 lg:my-24 px-4 sm:px-6">
      <div className=" grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left Column - Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Get in Touch
            <span className="block w-16 h-2 bg-primary mt-4 rounded-full" />
          </h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-gray-700">Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John Doe"
                          className="focus:ring-2 focus:ring-primary"
                          {...field}
                          value={field.value || ''}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-gray-700">Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="john@example.com"
                          className="focus:ring-2 focus:ring-primary"
                          {...field}
                          value={field.value || ''}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* subject */}
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-gray-700">Subject</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="How can we help?"
                        className="focus:ring-2 focus:ring-primary"
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* message */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-gray-700">Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Your message here..."
                        className="h-32 focus:ring-2 focus:ring-primary"
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-center mt-3">
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-green-600 text-white transition-all transform hover:scale-[1.02]"
                >
                  {isSubmitting ? (
                    <div className="animate-spin">
                      <LoaderPinwheel />
                    </div>
                  ) : (
                    'Send Message'
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-secondary p-12 rounded-2xl flex flex-col justify-center space-y-8"
        >
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">
              Let&lsquo;s talk!
            </h2>
            <p className="text-lg text-gray-600">
              Prefer other ways to connect? Reach out through our social
              channels or use the contact information below.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white rounded-lg">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-gray-600">Email</p>
                <p className="font-medium text-gray-900">
                  support@swiftcart.com
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white rounded-lg">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-gray-600">Phone</p>
                <p className="font-medium text-gray-900">+880 1234 567 890</p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-primary/20">
            <h3 className="text-lg font-medium text-gray-900 mb-6">
              Follow Us
            </h3>
            <div className="flex space-x-6">
              {socialLinks.map(social => (
                <a
                  key={social.name}
                  href={social.url}
                  className="text-gray-600 hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-8 h-8" viewBox="0 0 24 24">
                    <path fill="currentColor" d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
