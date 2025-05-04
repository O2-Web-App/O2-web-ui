"use client";
import Image from "next/image";
import {Phone, Mail, Facebook, MapPin, MapPinHouse} from "lucide-react";
import Link from "next/link";
import {useContactUsMutation} from "@/app/redux/service/blog";
import {toast} from "sonner";
import {Formik, Field, Form, ErrorMessage} from "formik";
import * as Yup from "yup";
import {Label} from "@/components/ui/label";

export default function AboutUsComponent() {
    const [contact] = useContactUsMutation();

    // Validation schema
    const validationSchema = Yup.object({
        name: Yup.string().required("សូមបញ្ចូលឈ្មោះរបស់អ្នក"),
        email: Yup.string().email("អាសយដ្ឋានអ៊ីមែលមិនត្រឹមត្រូវ").required("សូមបញ្ចូលអ៊ីមែលរបស់អ្នក"),
        message: Yup.string().required("សូមបញ្ចូលមតិយោបលរបស់អ្នក"),
    });

    // Form submission handler
    const handleContact = async (
        values: { name: string; email: string; message: string },
        {setSubmitting, resetForm}: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
    ) => {
        setSubmitting(true);
        try {
            await contact({name: values.name, email: values.email, message: values.message}).unwrap();
            resetForm();
            toast.success("ការបញ្ចេញមតិយោបលរបស់អ្នកជោគជ័យ", {
                style: {
                    color: "white",
                    background: "#22bb33",
                    border: "1px solid #22bb33",
                },
            });
        } catch {
            toast.error("ការបញ្ចេញមតិយោបលរបស់អ្នកបរាជ័យ", {
                style: {
                    color: "white",
                    background: "#e0391f",
                    border: "1px solid #e0391f"
                },
            });
        } finally {
            setSubmitting(false);
        }
    };


    return (
        <section className="max-w-md mx-auto bg-gray-50 min-h-screen overflow-hidden ">
            {/* Main Content */}
            <section className="pb-4">
                {/* Hero Banner */}
                <div className="relative h-72 mb-4">
                    <Image
                        src="/assets/about-us.png"
                        alt="Vegetables and fruits"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 flex flex-col justify-center p-6 ">
                        <h1 className="text-primary font-semibold leading-[54px] text-3xl mb-4 text-center ">
                            ជាមួយពួកយើងលោកអ្នកអាចស្វែងរកគ្រប់ទំនិញដែលអ្នកចង់បាន ព្រមជាមួយគុណភាព
                        </h1>
                        <Link href="/privacy"
                              className="bg-secondary text-white py-1.5 px-3 rounded-md w-24 text-center mx-auto">ឯកជនភាព</Link>
                    </div>
                </div>

                {/* Categories Section */}
                <div className="px-4 mb-6">
                    <h2 className="text-blue-500 font-medium mb-10 text-2xl">គុណតម្លៃ៖</h2>
                    <div
                        className="flex gap-6 overflow-x-auto whitespace-nowrap scroll-smooth scrollbar-hide snap-x snap-mandatory pb-4">
                        {/* First Card */}
                        <div
                            className="flex-shrink-0 w-44 bg-white rounded-lg shadow-sm p-4 py-5 flex flex-col items-center snap-center">
                            <div className="w-14 h-14 flex items-center justify-center mx-auto">
                                <Image src="/assets/teamwork.png" alt="សមធម៌ និងបរិយាបន្ន" width={60} height={60}
                                       className="object-contain"/>
                            </div>
                            <span className="text-lg text-center mt-6">សមធម៌ និងបរិយាបន្ន</span>
                        </div>

                        {/* Second Card */}
                        <div
                            className="flex-shrink-0 w-44 bg-white rounded-lg shadow-sm p-4 py-5 flex flex-col items-center snap-center">
                            <div className="w-14 h-14 flex items-center justify-center mx-auto">
                                <Image src="/assets/planet-earth.png" alt="ទីផ្សារ" width={60} height={60}
                                       className="object-contain"/>
                            </div>
                            <span className="text-lg text-center mt-6">ចីរភាព</span>
                        </div>

                        {/* Third Card */}
                        <div
                            className="flex-shrink-0 w-44 bg-white rounded-lg shadow-sm p-4 py-5 flex flex-col items-center snap-center">
                            <div className="w-14 h-14 flex items-center justify-center mx-auto">
                                <Image src="/assets/collaboration.png" alt="ការចូលរួម" width={60} height={60}
                                       className="object-contain"/>
                            </div>
                            <span className="text-lg text-center mt-6">ការចូលរួម</span>
                        </div>

                        {/* Fourth Card */}
                        <div
                            className="flex-shrink-0 w-44 bg-white rounded-lg shadow-sm p-4 py-5 flex flex-col items-center snap-center">
                            <div className="w-14 h-14 flex items-center justify-center mx-auto">
                                <Image src="/assets/integration.png" alt="សុចរិតភាព" width={60} height={60}
                                       className="object-contain"/>
                            </div>
                            <span className="text-lg text-center mt-6">សុចរិតភាព</span>
                        </div>

                        {/* Fifth Card */}
                        <div
                            className="flex-shrink-0 w-44 bg-white rounded-lg shadow-sm p-4 py-5 flex flex-col items-center snap-center">
                            <div className="w-14 h-14 flex items-center justify-center mx-auto">
                                <Image src="/assets/transparency.png" alt="តម្លាភាព" width={60} height={60}
                                       className="object-contain"/>
                            </div>
                            <span className="text-lg text-center mt-6">តម្លាភាព</span>
                        </div>
                    </div>
                </div>

                {/* Information Sections */}
                <div className="px-4 mb-6">
                    <h2 className="text-blue-500 font-medium mb-8 text-2xl">ទស្សនវិស័យ៖</h2>
                    <p className="text-black/70 text-lg mb-6">
                        ជាកាតាលីករសម្រាប់ការអភិវឌ្ឍប្រកបដោយចីរភាពនៅកម្ពុជា លើកកម្ពស់អាជីវកម្មកសិកម្ម
                        គុណតម្លៃសហគ្រាសធុនតូចនិងមធ្យម កំណើនសេច្ចកិច្ចបៃតង ការពង្រឹងសិទ្ធិអំណាចដល់យុវជន និងស្ត្រី
                        ព្រមទាំងការអភិវឌ្ឍសម្រាប់សហគ្រិនភាព និងការគ្រប់គ្រងធុរៈកិច្ច។
                    </p>

                    <h2 className="text-blue-500 font-medium mb-8 text-2xl">បេសកកម្ម៖</h2>
                    <p className="text-black/70 text-lg mb-6">
                        O2 ប្ដេជ្ញាផ្តល់នូវក្របខណ្ឌសង្គមមួយដែលបើកឱ្យយុវជន និងស្ត្រីក្លាយជាអ្នកមានសេចក្ដីសម្រេចចិត្ត
                        ប្រកាន់ខ្ជាប់នូវគុណភាពជាអ្នកដឹកនាំ ការគ្រប់គ្រងដោយមាននិរន្តរភាព និងផ្ដល់ទំនុកចិត្តខ្ពស់។
                    </p>
                </div>

                {/* Organization Chart */}
                <div className="px-4 mb-6">
                    <Image
                        src="/assets/image.png"
                        alt="Organization chart"
                        width={400}
                        height={200}
                        className="w-full h-auto"
                    />
                </div>

                {/* Partners Section */}
                <div className="px-4 mb-6 ">
                    <h2 className="text-blue-500 font-medium mb-5 text-2xl">ទំនាក់ទំនងមកកាន់ពួកយើង៖</h2>
                    <Formik
                        initialValues={{name: "", email: "", message: ""}}
                        validationSchema={validationSchema}
                        onSubmit={handleContact}
                    >
                        {({isSubmitting}) => (
                            <Form className="space-y-6">
                                <div className={` space-y-1`}>
                                    <div className={` flex gap-1`}>
                                        <Label className={`text-sm`}>ឈ្មោះ</Label>
                                        <span className={` text-red-600 `}> *</span>
                                    </div>
                                    <Field
                                        type="text"
                                        name="name"
                                        placeholder="បញ្ចូលឈ្មោះរបស់អ្នក"
                                        className="w-full p-4 text-sm rounded-lg mb-3"
                                    />
                                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm"/>
                                </div>
                                <div className={` space-y-1`}>
                                    <div className={` flex gap-1`}>
                                        <Label className={`text-sm`}>អ៊ីមែល</Label>
                                        <span className={`text-red-600`}>*</span>
                                    </div>
                                    <Field
                                        type="email"
                                        name="email"
                                        placeholder="បញ្ចូលអ៊ីមែលរបស់អ្នក"
                                        className="w-full p-4 text-sm rounded-lg"
                                    />
                                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm"/>
                                </div>
                                <div className={` space-y-1`}>
                                    <div className={` flex gap-1`}>
                                        <Label className={`text-sm`}>មតិយោបល</Label>
                                        <span className={` text-red-600`}>*</span>
                                    </div>
                                    <Field
                                        as="textarea"
                                        name="message"
                                        placeholder="មតិយោបលរបស់អ្នក..."
                                        className="text-sm rounded-lg p-4 w-full h-36"
                                    />
                                    <ErrorMessage name="message" component="div" className="text-red-500 text-sm"/>
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-secondary text-white py-2.5 px-4 rounded-md mb-8 text-center w-full"
                                >
                                    {isSubmitting ? "កំពង់បញ្ចូន..." : "បញ្ជាក់ព័ត៌មានបន្ថែម"}
                                </button>
                            </Form>
                        )}
                    </Formik>

                    <div className="space-y-3 my-10">
                        {/* Phone */}
                        <div className="flex items-center gap-3">
                            <Phone className="w-6 h-6 text-gray-600"/>
                            <a href="tel:061200558" className="text-gray-700 hover:text-blue-500 transition">
                                061 200 558
                            </a>
                        </div>

                        {/* Email */}
                        <div className="flex items-center gap-3">
                            <Mail className="w-6 h-6 text-gray-600"/>
                            <a href="mailto:O2Project@proton.me"
                               className="text-gray-700 hover:text-blue-500 transition">
                                O2Project@proton.me
                            </a>
                        </div>

                        {/* Facebook */}
                        <div className="flex items-center gap-3">
                            <Facebook className="w-6 h-6 text-gray-600"/>
                            <a href="https://www.facebook.com/share/1BaLiMVK2K/" target="_blank"
                               rel="noopener noreferrer"
                               className="text-gray-700 hover:text-blue-500 transition">
                                One-House One-Garden
                            </a>
                        </div>

                        {/* Location (Google Maps) */}
                        <div className="flex items-start gap-3">
                            <MapPinHouse className="w-10 h-10 text-gray-600"/>
                            <a href="https://www.google.com/maps/search/?api=1&query=Sangkat+Tonle+Bassac,+Khan+Chamkarmon,+Phnom+Penh"
                               target="_blank"
                               rel="noopener noreferrer"
                               className="text-gray-700 hover:text-blue-500 transition">
                                Chamkar O'luk Village, Sangkat Kakap II, Khan Pou Senchey, Phnom Penh
                            </a>
                        </div>
                    </div>
                </div>

                {/* Map */}
                <div className="w-full h-36 mx-3 w-80">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!4v1727062217787!6m8!1m7!1sVHp0enuXkiJTlB9z39M4zQ!2m2!1d11.55663474906035!2d104.8862034768563!3f357.8562378182402!4f2.568982036305343!5f0.9516337819776355"
                        width="370" height="300"></iframe>
                </div>
            </section>
        </section>
    )
}