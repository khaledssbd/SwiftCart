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
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { toast } from 'sonner';
import { createCategory } from '@/services/Category';
import { Loader2, Plus, UploadCloud, X } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

type FormValues = {
  name: string;
  description: string;
};

const defaultValues: FormValues = {
  name: '',
  description: ''
};

const CreateCategoryModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  
  const form = useForm<FormValues>({
    defaultValues,
    mode: 'onChange'
  });

  const { reset } = form;

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setFile(file);
      setPreview(URL.createObjectURL(file));
    }
  });

  const onSubmit = async (data: FormValues) => {
    try {
      if (!file) {
        toast.error('Please upload an icon');
        return;
      }

      const formData = new FormData();
      formData.append('data', JSON.stringify(data));
      formData.append('icon', file);

      const res = await createCategory(formData);

      if (res?.success) {
        toast.success(res?.message);
        handleClose(); // This will close the modal and reset the form
      } else {
        toast.error(res?.message || 'Failed to create category');
      }
    } catch (err) {
      toast.error('An unexpected error occurred');
      console.error(err);
    }
  };

  const removeImage = () => {
    setFile(null);
    setPreview(null);
  };

  const handleClose = () => {
    setIsOpen(false);
    reset(defaultValues);
    setFile(null);
    setPreview(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Create Category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Create New Category</DialogTitle>
          <DialogDescription>
            Add a new product category to organize your inventory
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  rules={{ required: 'Category name is required' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value ?? ''}
                          placeholder="e.g. Electronics, Clothing"
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          value={field.value ?? ''}
                          placeholder="Brief description about this category"
                          className="min-h-[120px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormLabel>Category Icon</FormLabel>
                <div 
                  {...getRootProps()} 
                  className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${
                    isDragActive ? 'border-primary bg-primary/10' : 'border-muted-foreground/30'
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
                        onClick={(e) => {
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
                          <span className="text-primary">Drop the icon here</span>
                        ) : (
                          <>
                            <span className="font-medium text-primary">Click to upload</span>{' '}
                            or drag and drop
                          </>
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        SVG, PNG, JPG up to 5MB
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={handleClose}
                type="button"
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={form.formState.isSubmitting || !file}
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create Category'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategoryModal;