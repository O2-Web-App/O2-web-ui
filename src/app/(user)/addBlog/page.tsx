// 'use client'

// import React from 'react'
// import { Formik, Form, Field, ErrorMessage } from 'formik'
// import * as Yup from 'yup'
// import { cn } from '@/lib/utils'
// import MinimalTiptapEditor from '@/components/Components/texteditor/minimal-tiptap'
// import { useAddBlogMutation } from '@/app/redux/service/blog'
// import type { Content } from '@tiptap/react'
// import { usePostImageMutation } from '@/app/redux/service/user'

// const BlogSchema = Yup.object().shape({
//   title: Yup.string().required('Title is required'),
//   content: Yup.object()
//     .test('is-not-empty', 'Content is required', (value: any) => {
//       return value?.content?.some(
//         (node: any) => node.type === 'paragraph' && node.content?.length
//       )
//     })
//     .required('Content is required'),
//   youtube_videos: Yup.string().required('YouTube Video is required!'),
//   tags: Yup.string().required('Tags are required!'),
// })

// export default function AddBlogPage() {
//   const [createBlog, { isLoading, error }] = useAddBlogMutation()
//   const [uploadImage, { isLoading: isUploading }] = usePostImageMutation()

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Create a New Blog</h1>

//       <Formik
//         initialValues={{
//           title: '',
//           content: { type: 'doc', content: [{ type: 'paragraph' }] },
//           youtube_videos: '',
//           tags: '',
//           images: '',
//         }}
//         validationSchema={BlogSchema}
//         onSubmit={async (values, { resetForm }) => {
//           console.log("values:", values)
//           try {
//             let plainText = ''
//             let image = ''

//             if (
//               typeof values.content === 'object' &&
//               values.content !== null &&
//               'content' in values.content
//             ) {
//               const jsonContent = values.content as { content: any[] }

//               plainText =
//                 jsonContent.content
//                   ?.filter((node) => node.type === 'paragraph')
//                   ?.map(
//                     (node) =>
//                       node.content
//                         ?.map((child: any) => child.text)
//                         .join(' ') || ''
//                   )
//                   ?.join('\n') || ''

//               image =
//                 jsonContent.content?.find(
//                   (node) => node.type === 'image' && node.attrs?.src
//                 )?.attrs.src || ''
//             }

//             await createBlog({
//               title: values.title,
//               content: plainText,
//               image: image,
//               youtube_videos: values.youtube_videos
//                 .split(',')
//                 .map((v) => v.trim()),
//               tags: values.tags.split(',').map((v) => v.trim()),
//             }).unwrap()

//             resetForm()
//             alert('Blog created successfully!')
//           } catch (err) {
//             console.error('Create blog failed:', err)
//           }
//         }}
//       >
//         {({ values, setFieldValue, errors, touched }) => (
//           <Form className="space-y-6">
//             {/* Title */}
//             <div>
//               <label className="block mb-1 font-medium">Title</label>
//               <Field
//                 name="title"
//                 className={cn('w-full border p-2 rounded-xl', {
//                   'border-destructive': touched.title && errors.title,
//                 })}
//                 placeholder="Enter blog title"
//               />
//               <ErrorMessage
//                 name="title"
//                 component="div"
//                 className="text-red-500 text-sm"
//               />
//             </div>

//             {/* YouTube Video */}
//             <div>
//               <label className="block mb-1 font-medium">YouTube Video</label>
//               <Field
//                 name="youtube_videos"
//                 className={cn('w-full border p-2 rounded-xl', {
//                   'border-destructive':
//                     touched.youtube_videos && errors.youtube_videos,
//                 })}
//                 placeholder="Enter YouTube video links (comma separated)"
//               />
//               <ErrorMessage
//                 name="youtube_videos"
//                 component="div"
//                 className="text-red-500 text-sm"
//               />
//             </div>

//             {/* Tags */}
//             <div>
//               <label className="block mb-1 font-medium">Tags</label>
//               <Field
//                 name="tags"
//                 className={cn('w-full border p-2 rounded-xl', {
//                   'border-destructive': touched.tags && errors.tags,
//                 })}
//                 placeholder="Enter tags (comma separated)"
//               />
//               <ErrorMessage
//                 name="tags"
//                 component="div"
//                 className="text-red-500 text-sm"
//               />
//             </div>

//             {/* Content (Rich Text) */}
//             <div>
//               <label className="block mb-1 font-medium">Content</label>

//               <MinimalTiptapEditor
//                 value={values.content}
//                 onChange={(json) => setFieldValue('content', json)}
//                 className='bg-white rounded-2xl px-3 text-lg mt-2'
//               />
//               <ErrorMessage
//                 name="content"
//                 component="div"
//                 className="text-red-500 text-sm mt-1"
//               />
//             </div>

//             {/* Error Message */}
//             {error && (
//               <div className="text-red-500">
//                 Failed to submit blog. Please try again.
//               </div>
//             )}

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={isLoading}
//               className={cn(
//                 'bg-blue-600 text-white px-4 py-2 rounded',
//                 isLoading && 'opacity-50 cursor-not-allowed'
//               )}
//             >
//               {isLoading ? 'Submitting...' : 'Submit Blog'}
//             </button>

//             {/* Debug Output */}
//             <div className="mt-8 p-4 bg-gray-100 rounded text-wrap w-[500px]">
//               <h3 className="text-lg font-semibold mb-2 text-wrap w-[550px]">Form Values (Debug):</h3>
//               <pre>{JSON.stringify(values, null, 2)}</pre>
//             </div>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   )
// }



'use client'

import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { cn } from '@/lib/utils'
import MinimalTiptapEditor from '@/components/Components/texteditor/minimal-tiptap'
import { useAddBlogMutation } from '@/app/redux/service/blog'
import type { JSONContent } from '@tiptap/react'

const BlogSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  youtube_videos: Yup.string().required('YouTube Video is required!'),
  tags: Yup.string().required('Tags are required!'),
  content: Yup.mixed<JSONContent>()
    .test('has-content', 'Content is required', (value): value is JSONContent => {
      if (!value || value.type !== 'doc' || !Array.isArray(value.content)) {
        return false
      }

      return value.content.some((node :any) => {
        if (node.type === 'paragraph') {
          return (
            Array.isArray(node.content) &&
            node.content.some(
              (child: any) => typeof child.text === 'string' && !!child.text.trim()
            )
          )
        }
        return ['image', 'heading', 'blockquote'].includes(node.type)
      })
    })
    .required('Content is required'),
})

export default function AddBlogPage() {
  const [createBlog, { isLoading, error }] = useAddBlogMutation()

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create a New Blog</h1>

      <Formik
        initialValues={{
          title: '',
          content: { type: 'doc', content: [{ type: 'paragraph' }] },
          youtube_videos: '',
          tags: '',
        }}
        validationSchema={BlogSchema}
        onSubmit={async (values, { resetForm }) => {
          try {

            const content = values.content as any
            let plainText = ''
            let image = ''
            
            if (content?.content && Array.isArray(content.content)) {
              plainText = content.content
                .filter((node: any) => node.type === 'paragraph')
                .map((node: any) =>
                  node.content?.map((child: any) => child.text).join(' ') || ''
                )
                .join('\n')
            
              image =
                content.content.find(
                  (node: any) => node.type === 'image' && node.attrs?.src
                )?.attrs?.src || ''
            }
            

            await createBlog({
              title: values.title,
              content: plainText,
              image: image,
              youtube_videos: values.youtube_videos
                .split(',')
                .map((v) => v.trim()),
              tags: values.tags.split(',').map((v) => v.trim()),
            }).unwrap()

            resetForm()
            alert('Blog created successfully!')
          } catch (err) {
            console.error('Create blog failed:', err)
          }
        }}
      >
        {({ values, setFieldValue, errors, touched }) => (
          <Form className="space-y-6">
            <div>
              <label className="block mb-1 font-medium">Title</label>
              <Field
                name="title"
                className={cn('w-full border p-2 rounded-xl', {
                  'border-destructive': touched.title && errors.title,
                })}
                placeholder="Enter blog title"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">YouTube Video</label>
              <Field
                name="youtube_videos"
                className={cn('w-full border p-2 rounded-xl', {
                  'border-destructive':
                    touched.youtube_videos && errors.youtube_videos,
                })}
                placeholder="Enter YouTube video links (comma separated)"
              />
              <ErrorMessage
                name="youtube_videos"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Tags</label>
              <Field
                name="tags"
                className={cn('w-full border p-2 rounded-xl', {
                  'border-destructive': touched.tags && errors.tags,
                })}
                placeholder="Enter tags (comma separated)"
              />
              <ErrorMessage
                name="tags"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Content</label>
              <MinimalTiptapEditor
                value={values.content}
                onChange={(json) => setFieldValue('content', json)}
                className="bg-white rounded-2xl px-3 text-lg mt-2"
              />
              <ErrorMessage
                name="content"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {error && (
              <div className="text-red-500">
                Failed to submit blog. Please try again.
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                'bg-blue-600 text-white px-4 py-2 rounded',
                isLoading && 'opacity-50 cursor-not-allowed'
              )}
            >
              {isLoading ? 'Submitting...' : 'Submit Blog'}
            </button>

            {/* <div className="mt-8 p-4 bg-gray-100 rounded text-wrap w-[500px]">
              <h3 className="text-lg font-semibold mb-2 text-wrap w-[550px]">
                Form Values (Debug):
              </h3>
              <pre>{JSON.stringify(values, null, 2)}</pre>
            </div> */}
          </Form>
        )}
      </Formik>
    </div>
  )
}
