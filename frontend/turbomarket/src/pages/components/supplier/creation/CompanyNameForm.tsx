import React, {
  Fragment,
  useRef,
  useState,
  useContext,
  ChangeEvent,
} from "react";
import { ViewContext } from "store/supplierCreation/NavigationContextSupplier";
import { NameFormDataContext } from "store/supplierCreation/DataContextSupplier";
import { FormEvent } from "react";

type CompanyNameFormData = {
  website?: string;
  mobileNumber?: string;
  about?: string;
  profilePicture: File[];
  facilityPicture: File[];
};

export default function CompanyNameForm() {
  const [selectedFacilityImages, setSelectedFacilityImages] = useState<File[]>(
    []
  );
  const [selectedLogo, setSelectedLogo] = useState<File[]>([]);
  const { setCurrentView } = useContext(ViewContext);
  const { nameFormData, setNameFormData } = useContext(NameFormDataContext);

  const companyWebsite = useRef<HTMLInputElement>(null);
  const aboutText = useRef<HTMLTextAreaElement>(null);
  const mobileNumber = useRef<HTMLInputElement>(null);

  function handleSelectedFacilityImages(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFacilityImages([...selectedFacilityImages, ...files]);
    }
  }

  function handleSelectedLogo(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedLogo([...selectedLogo, ...files]);
    }
  }

  function handleSubmit(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();

    const newNameData = {
      website: String(companyWebsite.current!.value),
      mobileNumber: String(mobileNumber.current!.value),
      about: String(aboutText.current!.value),
      profilePicture: selectedLogo,
      facilityPicture: selectedFacilityImages,
    };

    setNameFormData(newNameData);

    setCurrentView(3);
  }

  return (
    <Fragment>
      <div>
        <div className="md:grid md:grid-cols-2 mx-40 md:gap-6  ">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-base font-semibold leading-6 text-gray-900">
                Your Profile
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0 shadow-2xl ">
            <form>
              <div className="shadow sm:overflow-hidden rounded-3xl">
                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="grid">
                      <div className="">
                        <label
                          htmlFor="company-website"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Website
                        </label>
                        <div className="mt-2 flex rounded-md shadow-sm">
                          <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
                            http://
                          </span>
                          <input
                            type="text"
                            name="company-website"
                            id="company-website"
                            className="block w-full flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                            placeholder="www.example.com"
                            ref={companyWebsite}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid">
                      <div className="col-span-3 sm:col-span-1">
                        <label
                          htmlFor="company-website"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Mobile Number
                        </label>
                        <div className="mt-2 flex rounded-md shadow-sm">
                          <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
                            tel:
                          </span>
                          <input
                            type="text"
                            name="company-number"
                            id="company-number"
                            className="block w-full flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                            placeholder="Mobile Number"
                            ref={mobileNumber}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      About
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="about"
                        name="about"
                        rows={3}
                        className="mt-1 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:py-1.5 sm:text-sm sm:leading-6"
                        placeholder="Thats how I bake my cakes..."
                        defaultValue={""}
                        ref={aboutText}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Brief description for your profile. Tell everyone how
                      awesome you are.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Photo
                    </label>
                    <div className="mt-2 flex items-center">
                      <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                        <svg
                          className="h-full w-full text-gray-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </span>

                      <label
                        htmlFor="profile-upload"
                        className="ml-5 rounded-md border border-gray-300 bg-white py-1.5 px-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-200"
                      >
                        <span>Change</span>
                        <input
                          id="profile-upload"
                          name="profile-file-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleSelectedLogo}
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Photos of your Facility
                    </label>
                    <div className="mt-2 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="facility-upload"
                            className="relative cursor-pointer rounded-md bg-white font-medium text-green-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-green-500 focus-within:ring-offset-2 hover:text-green-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="facility-upload"
                              name="facility-file-upload"
                              type="file"
                              className="sr-only"
                              multiple
                              onChange={handleSelectedFacilityImages}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="inline-flex justify-center rounded-md bg-green-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
