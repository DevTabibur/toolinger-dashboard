"use client";
import { useCallback, useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import {
  FiX,
  FiPlus,
  FiTrash2,
  FiChevronLeft,
  FiSettings,
  FiSave,
  FiSend,
  FiImage,
  FiTag,
  FiTrendingUp,
  FiLink,
  FiPackage,
  FiTruck,
  FiDollarSign,
  FiList,
  FiCheckCircle,
  FiGlobe,
  FiSearch,
  FiClock,
  FiBarChart2,
  FiLayout,
  FiUpload,
  FiEye,
  FiEyeOff,
  FiChevronDown,
  FiCalendar,
  FiStar,
} from "react-icons/fi";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import slugify from "slugify";
import { toast, Toaster } from "sonner";
import RichTextEditor from "@/components/editor/RichTextEditor";
import Link from "next/link";
import { Button, DashboardBreadcrumb } from "@/components/ui";
import { useLanguage } from "@/context/LanguageContext";
// import DropdownArrow from "@/components/custom/DropdownArrow";
// import { useGetAllCategoryQuery } from "@/redux/features/categoryApi";
// import { useGetAllBrandsQuery } from "@/redux/features/brandApi";
// import { useCreateProductApiMutation } from "@/redux/features/productApi";
// import RichTextEditor from "@/components/custom/RichTextEditor";
// import { usePermission } from "@/hook/usePermission";

// API imports
// import { useGetAllBodyTypesApiQuery } from "@/redux/features/bodyTypeApi";
// import { useGetAllProductColorsApiQuery } from "@/redux/features/productColorApi";
// import { useGetAllDrivetrainsApiQuery } from "@/redux/features/drivetrainApi";
// import { useGetAllFuelTypesApiQuery } from "@/redux/features/fuelTypeApi";
// import { useGetAllManufacturingYearsTypesApiQuery } from "@/redux/features/manufacturingYearsTypeApi";
// import { useGetAllMileagesTypesApiQuery } from "@/redux/features/mileagesTypeApi";
// import { useGetAllSeatingCapacitiesApiQuery } from "@/redux/features/seatingCapacityApi";
// import { useGetAllProductSizeApiQuery } from "@/redux/features/productSizeApi";
// import { useGetAllTransmissionTypesApiQuery } from "@/redux/features/transmissionTypeApi";
// import { useGetAllProductWeightsApiQuery } from "@/redux/features/productWeightApi";

// ✅ CUSTOM SLUGIFY FUNCTION
const createSlug = (text: string) => {
  if (!text) return '';

  const transliterated = transliterateToEnglish(text);

  const slug = slugify(text, {
    lower: true,
    strict: false,
    remove: /[*+~.()'"!:@]/g,
    locale: 'en',
    replacement: '-',
  });

  if (!slug || slug.replace(/-/g, '') === '') {
    return text
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\u0980-\u09FF\u0900-\u097F\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  }

  return slug;
};

// ✅ ENHANCED SLUG NORMALIZATION FUNCTION
const normalizeSlug = (input: string) => {
  if (!input) return '';

  return input
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\u0980-\u09FF\u0900-\u097F\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

// ✅ TRANSLITERATION FUNCTION
const transliterateToEnglish = (text: string) => {
  const hindiMap = {
    'अ': 'a', 'आ': 'aa', 'इ': 'i', 'ई': 'ee', 'उ': 'u', 'ऊ': 'oo', 'ऋ': 'ri', 'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au',
    'क': 'k', 'ख': 'kh', 'ग': 'g', 'घ': 'gh', 'ङ': 'ng', 'च': 'ch', 'छ': 'chh', 'ज': 'j', 'झ': 'jh', 'ञ': 'ny',
    'ट': 't', 'ठ': 'th', 'ড': 'd', 'ढ': 'dh', 'ण': 'n', 'त': 't', 'थ': 'th', 'द': 'd', 'ध': 'dh', 'न': 'n',
    'प': 'p', 'फ': 'ph', 'ব': 'b', 'ভ': 'bh', 'म': 'm', 'य': 'y', 'र': 'r', 'ल': 'l', 'व': 'v', 'श': 'sh',
    'ष': 'sh', 'स': 's', 'ह': 'h', 'क्ष': 'ksh', 'त्र': 'tr', 'ज्ञ': 'gya',
    'ा': 'aa', 'ि': 'i', 'ी': 'ee', 'ु': 'u', 'ू': 'oo', 'ृ': 'ri', 'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au',
    'ং': 'n', 'ः': 'h', '़': '', 'ऽ': '', '्': '',
  };

  const bengaliMap = {
    'অ': 'o', 'আ': 'a', 'ই': 'i', 'ঈ': 'ee', 'উ': 'u', 'ঊ': 'oo', 'ऋ': 'ri', 'এ': 'e', 'ঐ': 'oi', 'ও': 'o', 'ঔ': 'ou',
    'ক': 'k', 'খ': 'kh', 'গ': 'g', 'ঘ': 'gh', 'ঙ': 'ng', 'চ': 'ch', 'ছ': 'chh', 'জ': 'j', 'ঝ': 'jh', 'ঞ': 'n',
    'ট': 't', 'ঠ': 'th', 'ড': 'd', 'ঢ': 'dh', 'ণ': 'n', 'ত': 't', 'थ': 'th', 'द': 'd', 'ध': 'dh', 'ন': 'n',
    'প': 'p', 'ফ': 'ph', 'ব': 'b', 'ভ': 'bh', 'ম': 'm', 'য': 'j', 'র': 'r', 'ल': 'l', 'শ': 'sh', 'ष': 'sh',
    'স': 's', 'ह': 'h', 'क्ष': 'kkho', 'ঞ্ঝ': 'nggho', 'ড়': 'r', 'ঢ়': 'rh', 'য়': 'y', 'ৎ': 't',
    'া': 'a', 'ি': 'i', 'ী': 'ee', 'ु': 'u', 'ू': 'oo', 'ृ': 'ri', 'ে': 'e', 'ৈ': 'oi', 'ো': 'o', 'ৌ': 'ou',
    'ং': 'ng', 'ঃ': 'h', 'ঁ': '', '্': '',
  };

  let result = '';

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (hindiMap[char]) {
      result += hindiMap[char];
    }
    else if (bengaliMap[char]) {
      result += bengaliMap[char];
    }
    else if (/[a-zA-Z0-9\s\-_]/.test(char)) {
      result += char;
    }
    else if (/[\s\t\n\r]/.test(char)) {
      result += ' ';
    }
    else {
      result += '';
    }
  }

  return result.trim();
};

// ✅ Detect language from text
const detectLanguage = (text: any) => {
  if (!text) return "en";

  if (/[\u0900-\u097F]/.test(text)) {
    return "hi";
  }

  if (/[\u0980-\u09FF]/.test(text)) {
    return "bn";
  }

  if (/[a-zA-Z]/.test(text)) {
    return "en";
  }

  return "en";
};

// ✅ Updated Validation Schema
const ProductSchema = Yup.object().shape({
  productName_en: Yup.string().required("Product name is required"),
  shortDescription_en: Yup.string().required("Short description is required"),
  category: Yup.string().required("Please select a category"),
  brand: Yup.string().required("Please select a brand"),
  slug: Yup.string().required("Slug is required"),
  regularPrice: Yup.string().required("price is required"),
  salePrice: Yup.number().min(0, "Price must be positive"),
  description_en: Yup.string().required("Description is required"),
});

// ✅ Updated Initial Form Values
const initialValues = {
  productName_en: "",
  shortDescription_en: "",
  category: "",
  brand: "",
  slug: "",
  newArrival: "yes",
  trending: "yes",
  topSelling: "no",
  featuredProducts: "no",
  flashSale: "no",
  hidePurchase: "no",
  is_active: "yes",
  tags: [],
  metaDescription: "",
  metaTitle: "",
  weight: "",
  size: "",
  bodyType: "",
  drivetrain: "",
  fuelType: "",
  manufacturingYear: "",
  mileage: "",
  seatingCapacity: "",
  transmission: "",
  regularPrice: "",
  salePrice: "",
  variations: [
    {
      images: [],
      color: "",
    },
  ],
  galleryImages: [],
  description_en: "",
  features: [
    {
      title: "",
      featureItems: [
        {
          featureName: "",
          details: "",
        },
      ],
    },
  ],
  keyFeatures: [
    {
      title: "Key Feature 1",
      details: "Feature details here",
    },
  ],
};

// Helper function to safely get data from API response
const getApiData = (apiResponse) => {
  if (!apiResponse?.data) return [];
  if (Array.isArray(apiResponse.data)) return apiResponse.data;
  if (apiResponse.data.data && Array.isArray(apiResponse.data.data)) return apiResponse.data.data;
  if (apiResponse.data.result && Array.isArray(apiResponse.data.result)) return apiResponse.data.result;
  return [];
};

// Variation Images Dropzone Component
const VariationImagesDropzone = ({ variationIndex, values, setFieldValue }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      const currentVariationImages = values.variations[variationIndex].images || [];
      const newFiles = [...currentVariationImages, ...acceptedFiles];
      setFieldValue(`variations.${variationIndex}.images`, newFiles);
    },
    [setFieldValue, values.variations, variationIndex]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  const currentImages = values.variations[variationIndex].images || [];

  return (
    <div className="space-y-3">
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-all group"
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-all">
            <FiUpload className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="font-medium text-gray-700">Upload variation images</p>
            <p className="text-sm text-gray-500 mt-1">Drag & drop or click to browse</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {currentImages.length > 0 ? (
          currentImages.map((file, index) => (
            <div key={index} className="relative border border-gray-200 rounded-lg overflow-hidden group w-32 h-32">
              <Image
                src={typeof file === "string" ? file : URL.createObjectURL(file)}
                alt={`Variation Image ${index + 1}`}
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    const newImages = currentImages.filter((_, i) => i !== index);
                    setFieldValue(`variations.${variationIndex}.images`, newImages);
                  }}
                  className="opacity-0 group-hover:opacity-100 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center w-full text-gray-400 text-sm py-4">
            No variation images uploaded yet
          </div>
        )}
      </div>
    </div>
  );
};

// Gallery Images Dropzone Component
// const GalleryImagesDropzone = ({ values, setFieldValue }) => {
//   const onDrop = useCallback(
//     (acceptedFiles) => {
//       const currentGalleryImages = values.galleryImages || [];
//       const newFiles = [...currentGalleryImages, ...acceptedFiles];
//       setFieldValue("galleryImages", newFiles);
//     },
//     [setFieldValue, values.galleryImages]
//   );

//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop,
//     accept: { "image/*": [] },
//     multiple: true,
//   });

//   const currentImages = values.galleryImages || [];

//   return (
//     <div className="space-y-3">
//       <div
//         {...getRootProps()}
//         className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-all group"
//       >
//         <input {...getInputProps()} />
//         <div className="flex flex-col items-center gap-3">
//           <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-all">
//             <FiUpload className="w-6 h-6 text-blue-600" />
//           </div>
//           <div>
//             <p className="font-medium text-gray-700">Upload gallery images</p>
//             <p className="text-sm text-gray-500 mt-1">Drag & drop or click to browse</p>
//           </div>
//         </div>
//       </div>

//       <div className="flex flex-wrap gap-3">
//         {currentImages.length > 0 ? (
//           currentImages.map((file, index) => (
//             <div key={index} className="relative border border-gray-200 rounded-lg overflow-hidden group w-32 h-32">
//               <Image
//                 src={typeof file === "string" ? file : URL.createObjectURL(file)}
//                 alt={`Gallery Image ${index + 1}`}
//                 fill
//                 className="object-cover object-center"
//               />
//               <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
//                 <button
//                   type="button"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     const newImages = currentImages.filter((_, i) => i !== index);
//                     setFieldValue("galleryImages", newImages);
//                   }}
//                   className="opacity-0 group-hover:opacity-100 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all"
//                 >
//                   <FiX className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="text-center w-full text-gray-400 text-sm py-4">
//             No gallery images uploaded yet
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// Main Component
export default function AddProductPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [currentTag, setCurrentTag] = useState("");
  const [publishMode, setPublishMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [detectedLanguage, setDetectedLanguage] = useState("en");
  const [isCustomSlug, setIsCustomSlug] = useState(false);
  const [rawSlug, setRawSlug] = useState("");
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [selectedCategoryData, setSelectedCategoryData] = useState(null);
  const tagInputRef = useRef(null);

  // const [createProductApi] = useCreateProductApiMutation();
  // const { data: categories } = useGetAllCategoryQuery();

  // অন্যান্য API
  // const { data: bodyTypes } = useGetAllBodyTypesApiQuery();
  // const { data: productColors } = useGetAllProductColorsApiQuery();
  // const { data: drivetrains } = useGetAllDrivetrainsApiQuery();
  // const { data: fuelTypes } = useGetAllFuelTypesApiQuery();
  // const { data: manufacturingYears } = useGetAllManufacturingYearsTypesApiQuery();
  // const { data: mileageTypes } = useGetAllMileagesTypesApiQuery();
  // const { data: seatingCapacities } = useGetAllSeatingCapacitiesApiQuery();
  // const { data: productSizes } = useGetAllProductSizeApiQuery();
  // const { data: transmissionTypes } = useGetAllTransmissionTypesApiQuery();
  // const { data: productWeights } = useGetAllProductWeightsApiQuery();

  // const categoriesData = getApiData(categories);
  // const bodyTypesData = getApiData(bodyTypes);
  // const productColorsData = getApiData(productColors);
  // const drivetrainsData = getApiData(drivetrains);
  // const fuelTypesData = getApiData(fuelTypes);
  // const manufacturingYearsData = getApiData(manufacturingYears);
  // const mileageTypesData = getApiData(mileageTypes);
  // const seatingCapacitiesData = getApiData(seatingCapacities);
  // const productSizesData = getApiData(productSizes);
  // const transmissionTypesData = getApiData(transmissionTypes);
  // const productWeightsData = getApiData(productWeights);

  // ক্যাটাগরি সিলেক্ট হলে ব্র্যান্ড ফিল্টার করার ফাংশন
  // const handleCategoryChange = (categoryId, setFieldValue) => {
  //   if (!categoryId) {
  //     setFilteredBrands([]);
  //     setSelectedCategoryData(null);
  //     setFieldValue("brand", "");
  //     return;
  //   }

  // নির্বাচিত ক্যাটাগরি খুঁজে বের করুন
  // const selectedCategory = categoriesData.find(cat => cat._id === categoryId);
  // setSelectedCategoryData(selectedCategory);

  // if (selectedCategory && selectedCategory.brands && Array.isArray(selectedCategory.brands)) {
  //   // ক্যাটাগরির সাথে সম্পর্কিত ব্র্যান্ডগুলো সেট করুন
  //   setFilteredBrands(selectedCategory.brands);
  //   console.log("Filtered Brands for Category:", selectedCategory.brands);
  // } else {
  //   setFilteredBrands([]);
  //   console.log("No brands found for this category");
  // }

  // // ব্র্যান্ড ফিল্ড রিসেট করুন
  // setFieldValue("brand", "");


  // ✅ Reset to auto-slug
  const resetToAutoSlug = useCallback((productName, setFieldValue) => {
    if (productName) {
      const autoSlug = createSlug(productName);
      setFieldValue("slug", autoSlug);
      setRawSlug(autoSlug);
      setIsCustomSlug(false);
    } else {
      setFieldValue("slug", "");
      setRawSlug("");
    }
  }, []);

  // ✅ Handle slug change - User custom input
  const handleSlugChange = useCallback((e, setFieldValue) => {
    const value = e.target.value;
    setRawSlug(value);
    setFieldValue("slug", value);
    setIsCustomSlug(true);
  }, []);

  // ✅ Handle slug blur - Convert spaces to hyphens
  const handleSlugBlur = useCallback((e, setFieldValue) => {
    const value = e.target.value;
    const normalizedSlug = normalizeSlug(value);

    if (value !== normalizedSlug) {
      setFieldValue("slug", normalizedSlug);
      setRawSlug(normalizedSlug);

      toast.info("Spaces converted to hyphens", {
        duration: 2000,
      });
    }
  }, []);

  // Submit Handler
  const handleSubmit = async (values, { resetForm }) => {
    try {
      if (publishMode) {
        setLoading(true);
      } else {
        setSaving(true);
      }

      const formData = new FormData();

      const processedValues = {
        ...values,
        is_active: values.is_active === "yes" ? "yes" : "no",
        newArrival: values.newArrival === "yes" ? "yes" : "no",
        trending: values.trending === "yes" ? "yes" : "no",
        topSelling: values.topSelling === "yes" ? "yes" : "no",
        featuredProducts: values.featuredProducts === "yes" ? "yes" : "no",
        flashSale: values.flashSale === "yes" ? "yes" : "no",
        hidePurchase: values.hidePurchase === "yes" ? "yes" : "no",
        slug: normalizeSlug(values.slug),
      };

      for (const key in processedValues) {
        if (key === "variations") {
          formData.append("variations", JSON.stringify(processedValues.variations));
          processedValues.variations.forEach((variation, variationIndex) => {
            if (variation.images?.length > 0) {
              variation.images.forEach((file) => {
                if (file instanceof File || (file && file.name)) {
                  formData.append(`variation_images[${variationIndex}]`, file);
                }
              });
            }
          });
        } else if (key === "galleryImages") {
          if (processedValues.galleryImages?.length > 0) {
            processedValues.galleryImages.forEach((file) => {
              formData.append("galleryImages", file);
            });
          }
        } else if (key === "features" || key === "keyFeatures" || key === "tags") {
          if (key === "keyFeatures") {
            const validKeyFeatures = processedValues[key].filter(
              feature => feature.title && feature.title.trim() && feature.details && feature.details.trim()
            );
            if (validKeyFeatures.length === 0) {
              toast.error("Please add at least one valid key feature");
              return;
            }
            formData.append(key, JSON.stringify(validKeyFeatures));
          } else {
            formData.append(key, JSON.stringify(processedValues[key]));
          }
        } else if (key === "category") {
          formData.append("categoryID", processedValues[key]);
        } else if (key === "brand") {
          formData.append("brandId", processedValues[key]);
        } else if (key === "is_active") {
          formData.append("is_active", processedValues[key]);
        } else {
          formData.append(key, processedValues[key]);
        }
      }

      console.log("Submitting form data...", processedValues);
      await createProductApi(formData).unwrap();

      if (publishMode) {
        toast.success("✨ Vehicles published successfully!");
        resetForm();
        setRawSlug("");
        setIsCustomSlug(false);
        setFilteredBrands([]);
        setSelectedCategoryData(null);
        router.push("/products");
      } else {
        toast.success("💾 Draft saved successfully!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error?.data?.message || `Failed to ${publishMode ? 'publish' : 'save draft'}!`);
    } finally {
      setLoading(false);
      setSaving(false);
    }
  };

  // Add Tag Handler
  const addTag = useCallback((setFieldValue, values, currentTag) => {
    const trimmedTag = currentTag.trim();
    if (trimmedTag && !values.tags.includes(trimmedTag)) {
      setFieldValue("tags", [...values.tags, trimmedTag]);
      setCurrentTag("");
      tagInputRef.current?.focus();
    }
  }, []);

  // Remove Tag Handler
  const removeTag = useCallback((setFieldValue, values, tagToRemove) => {
    setFieldValue("tags", values.tags.filter((tag) => tag !== tagToRemove));
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">{t("Blog Categories")}</h1>
          <p className="text-sm text-zinc-500 mt-1">{t("Manage your blogs")}</p>
        </div>
        <Link
          href="/dashboard/cms/blog/category/create"
          className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-[var(--primary-foreground)] border-none cursor-pointer"
        >
          <Button className="flex items-center cursor-pointer" icon={<FiPlus className="w-4 h-4 mr-2" />}>

            {t("Add Category")}
          </Button>
        </Link>
      </div>
      {/* breadcurmb */}
      <DashboardBreadcrumb items={[{ label: t("Content (CMS)") }, { label: t("Blog") }, { label: t("Blog Categories") }]} />

      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur-sm px-4 sm:px-6 py-3 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => router.back()}
              className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 text-gray-600 transition-all"
              aria-label="Go back"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Add New Vehicles</h1>
              <p className="text-xs text-gray-500">Create and manage your Vehicles</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="flex items-center justify-center w-8 h-8 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors sm:hidden"
              aria-label={sidebarCollapsed ? "Show settings" : "Hide settings"}
            >
              <FiSettings className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  const form = document.getElementById('ProductForm');
                  if (form) {
                    setPublishMode(false);
                    form.requestSubmit();
                  }
                }}
                disabled={saving}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 text-sm ${saving
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 hover:text-gray-900 shadow-sm hover:shadow cursor-pointer"
                  }`}
              >
                {saving ? (
                  <>
                    <svg className="animate-spin h-3 w-3 text-gray-600" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <FiSave className="w-4 h-4" />
                    Save Draft
                  </>
                )}
              </button>

              <button
                type="submit"
                form="ProductForm"
                onClick={() => setPublishMode(true)}
                disabled={loading}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 text-sm ${loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow hover:shadow-md cursor-pointer"
                  } text-white`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-3 w-3 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Publishing...
                  </>
                ) : (
                  <>
                    <FiSend className="w-4 h-4" />
                    Publish Vehicles
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-3 sm:p-4 max-w-7xl mx-auto">
        <Formik
          initialValues={initialValues}
          validationSchema={ProductSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, handleSubmit, errors, touched }) => {
            // ✅ Auto-detect language and generate slug
            useEffect(() => {
              // Detect language from product name
              const lang = detectLanguage(values.productName_en);
              setDetectedLanguage(lang);

              if (values.productName_en && !values.slug && !isCustomSlug) {
                const autoSlug = createSlug(values.productName_en);
                setFieldValue("slug", autoSlug);
                setRawSlug(autoSlug);
              }
            }, [values.productName_en, values.slug, setFieldValue, isCustomSlug]);

            // Update word count
            useEffect(() => {
              const text = values.description_en || "";
              setCharCount(text.length);
              setWordCount(text.trim() === "" ? 0 : text.trim().split(/\s+/).length);
            }, [values.description_en]);

            return (
              <Form id="ProductForm">
                <div className="flex flex-col lg:flex-row gap-4">
                  {/* Left Column - Main Content */}
                  <div className={`lg:w-8/12 ${sidebarCollapsed ? 'lg:w-11/12' : ''}`}>
                    <div className="space-y-4">
                      {/* Product Name */}
                      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-sm font-semibold text-gray-900">
                            Vehicles Name <span className="text-red-500">*</span>
                          </label>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs px-2 py-1 rounded-full ${values.is_active === "yes"
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                              }`}>
                              {values.is_active === "yes" ? 'Active' : 'Draft'}
                            </span>
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-gray-500">{values.productName_en.length}/120</span>
                              {detectedLanguage !== "en" && (
                                <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                                  {detectedLanguage === "hi" ? "हिन्दी" : detectedLanguage === "bn" ? "বাংলা" : "English"}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <Field
                          name="productName_en"
                          className="w-full p-3 text-lg font-semibold placeholder-gray-400 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                          placeholder="Enter Vehicles name (English, हिन्दी)..."
                          maxLength={120}
                          onChange={(e) => {
                            setFieldValue("productName_en", e.target.value);
                            // Reset custom slug flag when name changes
                            if (isCustomSlug) {
                              setIsCustomSlug(false);
                            }
                          }}
                        />
                        <ErrorMessage
                          name="productName_en"
                          component="div"
                          className="mt-1 text-xs text-red-600 bg-red-50 px-2 py-1.5 rounded"
                        />
                        <div className="mt-1 text-xs text-gray-500">
                          {values.productName_en ? (
                            <span>
                              Detected language:{" "}
                              <span className="font-medium">
                                {detectedLanguage === "hi" ? "Hindi" :
                                  detectedLanguage === "bn" ? "Bengali" : "English"}
                              </span>
                            </span>
                          ) : (
                            "Enter product name in any language"
                          )}
                        </div>
                      </div>

                      {/* Description */}
                      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                        <div className="border-b border-gray-200 bg-gray-50 px-4 py-2">
                          <div className="flex items-center justify-between">
                            <label className="text-sm font-semibold text-gray-900">Description</label>
                            <div className="flex items-center gap-3 text-xs text-gray-500">
                              <span>{wordCount} words</span>
                              <span className="h-4 w-px bg-gray-300"></span>
                              <span>{charCount} chars</span>
                            </div>
                          </div>
                        </div>
                        <div className="p-3">
                          <RichTextEditor
                            value={values.description_en}
                            onChange={(content: any) => setFieldValue("description_en", content)}
                            placeholder="Write Vehicles description here..."
                          />
                          <ErrorMessage
                            name="description_en"
                            component="div"
                            className="mt-2 text-xs text-red-600 bg-red-50 px-2 py-1.5 rounded"
                          />
                        </div>
                      </div>

                      {/* Short Description */}
                      {/* <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-semibold text-gray-900">Short Description</label>
                        <span className="text-xs text-gray-500">{values.shortDescription_en?.length || 0}/200</span>
                      </div>
                      <Field
                        as="textarea"
                        name="shortDescription_en"
                        rows="2"
                        className="w-full p-3 placeholder-gray-400 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none resize-none text-sm"
                        placeholder="Brief summary for Vehicles listings..."
                        maxLength={200}
                      />
                      <ErrorMessage
                        name="shortDescription_en"
                        component="div"
                        className="mt-1 text-xs text-red-600 bg-red-50 px-2 py-1.5 rounded"
                      />
                    </div> */}

                      {/* Features Section */}
                      {/* <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                      <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <FiPackage className="w-4 h-4 text-gray-400" />
                        Features
                      </h3>
                      <FieldArray
                        name="features"
                        render={(arrayHelpers) => (
                          <div className="space-y-4">
                            {values.features.map((feature, fIndex) => (
                              <div key={fIndex} className="space-y-4 p-4 border border-gray-200 rounded-lg">
                                <div className="flex justify-between items-center">
                                  <h4 className="font-medium text-gray-700">Feature Group {fIndex + 1}</h4>
                                  <button
                                    type="button"
                                    onClick={() => arrayHelpers.remove(fIndex)}
                                    className="text-red-500 hover:text-red-700 p-1"
                                  >
                                    <FiTrash2 size={18} />
                                  </button>
                                </div>

                                <div>
                                  <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
                                  <Field
                                    name={`features.${fIndex}.title`}
                                    placeholder="e.g. Engine Specifications"
                                    className="w-full p-2 text-sm placeholder-gray-400 bg-gray-50 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                                  />
                                  <ErrorMessage
                                    name={`features.${fIndex}.title`}
                                    component="div"
                                    className="mt-1 text-xs text-red-600 bg-red-50 px-2 py-1.5 rounded"
                                  />
                                </div>

                                <FieldArray
                                  name={`features.${fIndex}.featureItems`}
                                  render={(featureItemHelpers) => (
                                    <div className="space-y-3">
                                      {feature.featureItems.map((item, itemIndex) => (
                                        <div key={itemIndex} className="space-y-2 p-3 bg-gray-50 rounded-lg">
                                          <div className="flex justify-between items-center">
                                            <h5 className="text-sm font-medium text-gray-600">Feature Item {itemIndex + 1}</h5>
                                            {feature.featureItems.length > 1 && (
                                              <button
                                                type="button"
                                                onClick={() => featureItemHelpers.remove(itemIndex)}
                                                className="text-red-400 hover:text-red-600 p-1"
                                              >
                                                <FiTrash2 size={16} />
                                              </button>
                                            )}
                                          </div>
                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <div>
                                              <label className="block text-xs font-medium text-gray-700 mb-1">Feature Name</label>
                                              <Field
                                                name={`features.${fIndex}.featureItems.${itemIndex}.featureName`}
                                                placeholder="Feature Name"
                                                className="w-full p-2 text-sm placeholder-gray-400 bg-white border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                                              />
                                              <ErrorMessage
                                                name={`features.${fIndex}.featureItems.${itemIndex}.featureName`}
                                                component="div"
                                                className="mt-1 text-xs text-red-600"
                                              />
                                            </div>
                                            <div>
                                              <label className="block text-xs font-medium text-gray-700 mb-1">Details</label>
                                              <Field
                                                name={`features.${fIndex}.featureItems.${itemIndex}.details`}
                                                placeholder="Feature Details"
                                                className="w-full p-2 text-sm placeholder-gray-400 bg-white border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                                              />
                                              <ErrorMessage
                                                name={`features.${fIndex}.featureItems.${itemIndex}.details`}
                                                component="div"
                                                className="mt-1 text-xs text-red-600"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                      <button
                                        type="button"
                                        onClick={() => featureItemHelpers.push({ featureName: "", details: "" })}
                                        className="w-full py-2 border border-dashed border-gray-400 text-gray-600 rounded-md text-sm font-medium hover:bg-gray-50"
                                      >
                                        + Add More Feature Item
                                      </button>
                                    </div>
                                  )}
                                />
                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={() => arrayHelpers.push({ title: "", featureItems: [{ featureName: "", details: "" }] })}
                              className="w-full py-3 border border-dashed border-primary text-primary rounded-md font-medium hover:bg-primary/5"
                            >
                              + Add Another Feature Group
                            </button>
                          </div>
                        )}
                      />
                    </div> */}

                      {/* Key Features Section */}
                      {/* <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                      <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <FiStar className="w-4 h-4 text-gray-400" />
                        Key Features
                      </h3>
                      <FieldArray
                        name="keyFeatures"
                        render={(arrayHelpers) => (
                          <div className="space-y-4">
                            {values.keyFeatures.map((keyFeature, index) => (
                              <div key={index} className="space-y-3 p-4 border border-gray-200 rounded-lg relative">
                                <div className="flex justify-between items-center">
                                  <h4 className="font-medium text-gray-700">Key Feature {index + 1}</h4>
                                  {values.keyFeatures.length > 1 && (
                                    <button
                                      type="button"
                                      onClick={() => arrayHelpers.remove(index)}
                                      className="text-red-500 hover:text-red-700 p-1"
                                    >
                                      <FiTrash2 size={18} />
                                    </button>
                                  )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
                                    <Field
                                      name={`keyFeatures.${index}.title`}
                                      placeholder="e.g. Sunroof"
                                      className="w-full p-2 text-sm placeholder-gray-400 bg-white border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                                    />
                                    <ErrorMessage
                                      name={`keyFeatures.${index}.title`}
                                      component="div"
                                      className="mt-1 text-xs text-red-600"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Details</label>
                                    <Field
                                      name={`keyFeatures.${index}.details`}
                                      placeholder="e.g. Panoramic Sunroof"
                                      className="w-full p-2 text-sm placeholder-gray-400 bg-white border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                                    />
                                    <ErrorMessage
                                      name={`keyFeatures.${index}.details`}
                                      component="div"
                                      className="mt-1 text-xs text-red-600"
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}

                            <button
                              type="button"
                              onClick={() => arrayHelpers.push({ title: "", details: "" })}
                              className="w-full py-3 border border-dashed border-primary text-primary rounded-md font-medium hover:bg-primary/5"
                            >
                              + Add Another Key Feature
                            </button>
                          </div>
                        )}
                      />
                      <ErrorMessage
                        name="keyFeatures"
                        component="div"
                        className="mt-2 text-xs text-red-600 bg-red-50 px-2 py-1.5 rounded"
                      />
                    </div> */}

                      {/* Gallery Images */}
                      {/* <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                      <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <FiImage className="w-4 h-4 text-gray-400" />
                        Gallery Images
                      </h3>
                      <GalleryImagesDropzone values={values} setFieldValue={setFieldValue} />
                    </div> */}
                    </div>
                  </div>

                  {/* Right Column - Sidebar */}
                  <div className={`lg:w-4/12 ${sidebarCollapsed ? 'lg:w-1/12' : ''}`}>
                    {!sidebarCollapsed && (
                      <div className="space-y-4">
                        {/* Product Status */}
                        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                          <h3 className="text-sm font-semibold text-gray-900 mb-3">Vehicles Status</h3>
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setFieldValue("is_active", "no");
                                setPublishMode(false);
                              }}
                              className={`p-3 rounded-lg border transition-all text-sm flex flex-col items-center justify-center ${values.is_active === "no"
                                ? "border-blue-500 bg-blue-50 text-blue-700 ring-2 ring-blue-500/20"
                                : "border-gray-200 hover:border-gray-300 text-gray-700"
                                }`}
                            >
                              <FiSave className="w-5 h-5 mb-2" />
                              <span className="font-medium">Draft</span>
                              <span className="text-xs text-gray-500 mt-1">Save privately</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setFieldValue("is_active", "yes");
                                setPublishMode(true);
                              }}
                              className={`p-3 rounded-lg border transition-all text-sm flex flex-col items-center justify-center ${values.is_active === "yes"
                                ? "border-green-500 bg-green-50 text-green-700 ring-2 ring-green-500/20"
                                : "border-gray-200 hover:border-gray-300 text-gray-700"
                                }`}
                            >
                              <FiSend className="w-5 h-5 mb-2" />
                              <span className="font-medium">Publish</span>
                              <span className="text-xs text-gray-500 mt-1">Make live</span>
                            </button>
                          </div>

                          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-900">Current Status</p>
                                <p className="text-xs text-gray-500">
                                  {values.is_active === "yes"
                                    ? "Vehicles will be published immediately"
                                    : "Saved as draft - only you can see"}
                                </p>
                              </div>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${values.is_active === "yes"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                                }`}>
                                {values.is_active === "yes" ? "Active" : "Draft"}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* URL & Category - UPDATED WITH CATEGORY-BASED BRANDS */}
                        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                          <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <FiLink className="w-4 h-4 text-gray-400" />
                            URL & Category
                          </h3>

                          <div className="space-y-3">
                            {/* Slug Input */}
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <label className="block text-xs font-medium text-gray-700">
                                  URL Slug <span className="text-red-500">*</span>
                                </label>
                                <div className="flex items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() => resetToAutoSlug(values.productName_en, setFieldValue)}
                                    className="text-xs px-2 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-md transition-colors"
                                    title="Auto-generate slug from product name"
                                  >
                                    Auto-generate
                                  </button>
                                  <span className={`text-xs px-2 py-0.5 rounded-full ${detectedLanguage !== "en"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-gray-100 text-gray-800"
                                    }`}>
                                    {detectedLanguage !== "en"
                                      ? `${detectedLanguage === "hi" ? "Hindi" : "Bengali"} Slug`
                                      : "English Slug"
                                    }
                                  </span>
                                </div>
                              </div>
                              <div className="mb-2 p-2 bg-gray-50 rounded border border-gray-200 text-xs">
                                <div className="flex items-center">
                                  <span className="text-gray-400">yourstore.com/products/</span>
                                  <span className={`font-medium ml-1 ${detectedLanguage !== "en" ? "text-blue-800" : "text-gray-800"
                                    }`}>
                                    {rawSlug || "slug"}
                                  </span>
                                </div>
                                <div className="mt-2 p-2 bg-yellow-50 border border-yellow-100 rounded">
                                  <div className="flex items-start gap-2">
                                    <span className="text-yellow-600">💡</span>
                                    <div>
                                      <p className="text-xs font-medium text-yellow-800">How slug works:</p>
                                      <p className="text-xs text-yellow-700 mt-1">
                                        • Type with spaces (e.g., "new product")<br />
                                        • When you click outside, spaces become hyphens (e.g., "new-product")<br />
                                        • Special characters are automatically removed
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <Field
                                name="slug"
                                placeholder="Enter slug (e.g., 'new product' → 'new-product')"
                                className="w-full p-2 text-sm placeholder-gray-400 bg-gray-50 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                                value={rawSlug}
                                onChange={(e) => handleSlugChange(e, setFieldValue)}
                                onBlur={(e) => handleSlugBlur(e, setFieldValue)}
                              />
                              <ErrorMessage
                                name="slug"
                                component="div"
                                className="mt-1 text-xs text-red-600"
                              />
                              <div className="mt-2 space-y-2">
                                <div className="text-xs text-gray-500">
                                  {values.slug ? (
                                    isCustomSlug ? (
                                      <span className="text-purple-600 font-medium flex items-center gap-1">
                                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                                        Custom slug is set
                                      </span>
                                    ) : (
                                      <span className={`font-medium flex items-center gap-1 ${detectedLanguage !== "en" ? "text-blue-600" : "text-green-600"
                                        }`}>
                                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                        {detectedLanguage !== "en" ? "Multilingual" : "Auto-generated"} slug
                                      </span>
                                    )
                                  ) : (
                                    <span className="text-gray-500 flex items-center gap-1">
                                      <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                                      Will auto-generate from product name in {detectedLanguage === "hi" ? "Hindi" : detectedLanguage === "bn" ? "Bengali" : "English"}
                                    </span>
                                  )}
                                </div>

                                {/* Live Preview of what will be saved */}
                                {rawSlug && rawSlug.includes(' ') && (
                                  <div className="p-2 bg-blue-50 border border-blue-100 rounded text-xs">
                                    <p className="text-blue-800 font-medium">Preview of saved slug:</p>
                                    <p className="text-blue-700 mt-1">
                                      <span className="line-through">{rawSlug}</span>
                                      <span className="mx-2">→</span>
                                      <span className="font-bold">{normalizeSlug(rawSlug)}</span>
                                    </p>
                                    <p className="text-blue-600 mt-1">(Spaces will be converted to hyphens when saved)</p>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Category and Brand - UPDATED */}
                            {/* <div className="space-y-2">
                              <div className="relative">
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  Category <span className="text-red-500">*</span>
                                </label>
                                <Field
                                  as="select"
                                  name="category"
                                  className="w-full p-2 text-sm placeholder-gray-400 bg-gray-50 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none appearance-none"
                                  onChange={(e) => {
                                    const categoryId = e.target.value;
                                    setFieldValue("category", categoryId);
                                    handleCategoryChange(categoryId, setFieldValue);
                                  }}
                                >
                                  <option value="">Select Category</option>
                                  {categoriesData.map((cat) => (
                                    <option key={cat._id || cat.id} value={cat._id || cat.id}>
                                      {cat.name || cat.name_en}
                                    </option>
                                  ))}
                                </Field>
                                <DropdownArrow />
                                <ErrorMessage
                                  name="category"
                                  component="div"
                                  className="mt-1 text-xs text-red-600"
                                />
                                {selectedCategoryData && (
                                  <div className="mt-2 p-2 bg-blue-50 border border-blue-100 rounded text-xs">
                                    <p className="text-blue-800 font-medium">Selected Category: {selectedCategoryData.name || selectedCategoryData.name_en}</p>
                                    <p className="text-blue-700 mt-1">
                                      Brands available: {filteredBrands.length}
                                    </p>
                                  </div>
                                )}
                              </div>

                              <div className="relative">
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  Brand <span className="text-red-500">*</span>
                                </label>
                                <Field
                                  as="select"
                                  name="brand"
                                  className="w-full p-2 text-sm placeholder-gray-400 bg-gray-50 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none appearance-none"
                                  disabled={!values.category}
                                >
                                  <option value="">{values.category ? "Select Brand" : "First select a category"}</option>
                                  {filteredBrands.map((brand) => (
                                    <option key={brand._id || brand.id} value={brand._id || brand.id}>
                                      {brand.name || brand.name_en}
                                    </option>
                                  ))}
                                </Field>
                                <DropdownArrow />
                                <ErrorMessage
                                  name="brand"
                                  component="div"
                                  className="mt-1 text-xs text-red-600"
                                />
                                {values.category && filteredBrands.length === 0 && (
                                  <div className="mt-1 text-xs text-red-600 bg-red-50 px-2 py-1.5 rounded">
                                    No brands found for this category. Please select another category.
                                  </div>
                                )}
                              </div>
                            </div> */}
                          </div>
                        </div>



                        {/* Tags */}
                        {/* <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                        <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <FiTag className="w-4 h-4 text-gray-400" />
                          Tags
                        </h3>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={currentTag as any}
                            onChange={(e) => setCurrentTag(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                addTag(setFieldValue, values, currentTag);
                              }
                            }}
                            placeholder="Add tag..."
                            className="flex-1 p-2 text-sm placeholder-gray-400 bg-gray-50 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                            ref={tagInputRef}
                          />
                          <button
                            type="button"
                            onClick={() => addTag(setFieldValue, values, currentTag)}
                            className="bg-gray-800 hover:bg-gray-900 text-white px-3 py-2 rounded font-medium transition-all text-sm"
                          >
                            <FiPlus className="w-4 h-4" />
                          </button>
                        </div>
                        {values.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {values.tags.map((tag, index) => (
                              <div
                                key={index}
                                className="bg-blue-50 border border-blue-100 px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 group"
                              >
                                <span className="text-xs font-medium text-blue-700">#{tag}</span>
                                <button
                                  type="button"
                                  onClick={() => removeTag(setFieldValue, values, tag)}
                                  className="text-blue-400 hover:text-red-500 transition-colors"
                                >
                                  <FiX className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div> */}

                        {/* SEO */}
                        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                          <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <FiTrendingUp className="w-4 h-4 text-gray-400" />
                            SEO Settings
                          </h3>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Meta Title</label>
                            <Field
                              name="metaTitle"
                              className="w-full p-2 text-sm placeholder-gray-400 bg-gray-50 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none resize-none"
                              placeholder="SEO description..."
                            />
                            <div className="mt-1 text-xs text-gray-500 flex justify-between">
                              <span>{values.metaTitle?.length || 0}/60</span>
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Meta Description</label>
                            <Field
                              as="textarea"
                              name="metaDescription"
                              rows="2"
                              className="w-full p-2 text-sm placeholder-gray-400 bg-gray-50 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none resize-none"
                              placeholder="SEO description..."
                            />
                            <div className="mt-1 text-xs text-gray-500 flex justify-between">
                              <span>{values.metaDescription?.length || 0}/160</span>
                            </div>
                          </div>

                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}