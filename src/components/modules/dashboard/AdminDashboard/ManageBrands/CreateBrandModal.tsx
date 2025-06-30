'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { toast } from 'sonner';
import { createBrand } from '@/services/Brand';
import { Loader2, Plus, UploadCloud, X } from 'lucide-react';
import {
  useDropzone,
  DropzoneRootProps,
  DropzoneInputProps,
} from 'react-dropzone';
import Image from 'next/image';

type FormValues = {
  name: string;
};

const CreateBrandModal = () => {
  const [isOpen, setIsOpen] = useState(false); // Add state for dialog control
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const form = useForm<FormValues>({
    defaultValues: {
      name: '',
    },
  });

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  }: {
    getRootProps: () => DropzoneRootProps;
    getInputProps: () => DropzoneInputProps;
    isDragActive: boolean;
  } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles: File[]) => {
      const file: File = acceptedFiles[0];
      setFile(file);
      setPreview(URL.createObjectURL(file));
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      if (!file) {
        toast.error('Please upload a logo');
        return;
      }

      const formData = new FormData();
      formData.append('data', JSON.stringify(data));
      formData.append('logo', file);

      const res = await createBrand(formData);

      if (res.success) {
        toast.success(res.message);
        setIsOpen(false); // Close the modal on success
        form.reset(); // Reset the form
        setFile(null); // Clear the file
        setPreview(null); // Clear the preview
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const removeImage = () => {
    setFile(null);
    setPreview(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* Connect dialog to state */}
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Create Brand
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Create New Brand
          </DialogTitle>
          <DialogDescription>
            Add a new brand to your product catalog
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Logo Upload Section */}
          <div className="space-y-2">
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${
                isDragActive
                  ? 'border-primary bg-primary/10'
                  : 'border-muted-foreground/30'
              }`}
            >
              <input {...getInputProps()} />
              {preview ? (
                <div className="relative">
                  <Image
                    src={preview}
                    alt="Preview"
                    width={160}
                    height={160}
                    className="w-full h-40 object-contain rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={e => {
                      e.stopPropagation();
                      removeImage();
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <UploadCloud className="mx-auto h-10 w-10 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    {isDragActive ? (
                      <span className="text-primary">Drop the logo here</span>
                    ) : (
                      <>
                        <span className="font-medium text-primary">
                          Click to upload
                        </span>{' '}
                        or drag and drop
                      </>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG up to 5MB
                  </p>
                </div>
              )}
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ''}
                        placeholder="Brand name"
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={!file || form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    'Create Brand'
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBrandModal;
