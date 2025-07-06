import React, { useState } from "react";
import { ContentWrapper } from "../../../../components/layout/Wrapper";
import BreadCrumb from "../../../../components/ui/BreadCrumb";
import TextInput, { TextArea } from "../../../../components/ui/TextInput";
import Dropdown from "../../../../components/ui/Dropdown";
import Button from "../../../../components/ui/Button";
import InputLabel from "../../../../components/ui/InputLabel";
import { useAuthContext } from "../../../../context/AuthContext";

// this should be fetched on the server
const groups = [{ label: "SLU Dance Troupe", value: "12b1188a-92f2-4a7a-a382-fa911c2ab3d9" }];

const productionType = [
  { label: "Showcase", value: "showcase" },
  { label: "Major Concert", value: "majorConcert" },
];

//this should be fetched on the server
const genres = Array.from({ length: 10 }, (_, i) => ({
  label: `${i + 1}`,
  value: `${i + 1}`,
}));

const CreateShow = () => {
  const { user } = useAuthContext();
  const [errors, setErrors] = useState<{
    title?: string;
    productionType?: string;
    description?: string;
    genre?: string;
    imageCover?: string;
    group?: string;
  }>({});

  const [showData, setShowData] = useState({
    title: "",
    group: user?.department[0]?.departmentId || ("" as string | number),
    productionType: "" as string | number,
    description: "",
    genre: [] as string[],
    showImagePreview: "",
    image: null as File | null,
  });

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!showData.title) {
      newErrors.title = "Please input title";
    } else if (showData.title.length < 5) {
      newErrors.title = "Length must be greater than 5 characters";
    }

    if (!showData.productionType) {
      newErrors.productionType = "Please choose Production Type";
    }

    if (!showData.description) {
      newErrors.description = "Please add a description";
    } else if (showData.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters long";
    }

    if (showData.genre.length === 0) {
      newErrors.genre = "Please add at least one genre";
    } else if (showData.genre.some((item) => !item)) {
      newErrors.genre = "Please choose a genre for each field";
    }

    if (!showData.group && user?.role === "head" && !!user?.department) {
      newErrors.group = "Please choose Performing Group";
    }

    if (!showData.image) {
      newErrors.imageCover = "Please add an image cover";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShowData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setShowData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenreChange = (index: number, value: string | number) => {
    const updatedGenres = [...showData.genre];
    updatedGenres[index] = String(value);
    setShowData((prev) => ({ ...prev, genre: updatedGenres }));
  };

  const addGenre = () => {
    setShowData((prev) => ({
      ...prev,
      genre: [...prev.genre, ""],
    }));
  };

  const removeGenre = (index: number) => {
    const newGenre = showData.genre.filter((_, i) => i !== index);
    setShowData((prev) => ({
      ...prev,
      genre: newGenre,
    }));
  };

  const handleSumbit = () => {
    if (!validate()) return;
    alert("Form is valid. Ready to submit.");
  };

  return (
    <ContentWrapper className="lg:!p-20 flex flex-col">
      <BreadCrumb backLink="/shows" items={[{ name: "Return", path: "" }]} />
      <h1 className="text-3xl mt-10">Create New Show</h1>

      <ContentWrapper className="border border-lightGrey rounded-md mt-10">
        <h1 className="text-xl">Show Details</h1>

        <div className="flex mt-5 flex-col gap-5 lg:flex-row">
          <div className="flex gap-5 flex-col w-full">
            <TextInput
              isError={!!errors.title}
              errorMessage={errors.title}
              label="Show Title"
              value={showData.title}
              onChange={handleInputChange}
              name="title"
            />

            <div className="flex gap-10 lg:flex-col lg:gap-5 xl:flex-row xl:gap-10">
              <Dropdown
                isError={!!errors.group}
                errorMessage={errors.group}
                disabled={user?.role !== "head"}
                className="w-full"
                label="Performing Group"
                options={groups}
                value={showData.group}
                onChange={(value) => setShowData((prev) => ({ ...prev, group: value }))}
              />
              <Dropdown
                isError={!!errors.productionType}
                errorMessage={errors.productionType}
                className="w-full"
                label="Production Type"
                options={productionType}
                value={showData.productionType}
                onChange={(value) => setShowData((prev) => ({ ...prev, productionType: value }))}
              />
            </div>

            <TextArea
              label="Description"
              name="description"
              value={showData.description}
              onChange={handleTextAreaChange}
              isError={!!errors.description}
              errorMessage={errors.description}
            />

            <div className="flex flex-col">
              <InputLabel label="Genres" />
              <div className="flex items-center gap-5 flex-wrap">
                <div className="flex gap-3 flex-wrap">
                  {showData.genre.map((genre, index) => {
                    const availableGenres = genres.filter((g) => !showData.genre.includes(g.value) || g.value === genre);

                    return (
                      <div key={index} className="relative">
                        <button
                          type="button"
                          className="text-sm text-red mt-1 absolute -top-3 -right-1 font-bold z-10"
                          onClick={() => removeGenre(index)}
                        >
                          X
                        </button>
                        <Dropdown
                          isError={!showData.genre[index]}
                          className="w-full"
                          options={availableGenres}
                          value={genre}
                          onChange={(value) => handleGenreChange(index, value)}
                        />
                      </div>
                    );
                  })}
                </div>
                <Button type="button" className="flex items-center w-5 h-5 !p-3 justify-center" onClick={addGenre}>
                  +
                </Button>
              </div>
              {errors.genre && <p className="text-sm text-red mt-1">{errors.genre}</p>}
            </div>
          </div>

          <div className="w-full max-w-[500px]">
            <InputLabel label="Show Image Cover" />
            <div className="flex flex-col gap-2">
              {showData.showImagePreview && (
                <div className="h-full w-full border rounded border-lightGrey p-2">
                  <img src={showData.showImagePreview} alt="Preview" className="object-cover object-center" />
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    if (file.size > 1024 * 1024) {
                      alert("Image must be less than 1MB.");
                      return;
                    }

                    const imageURL = URL.createObjectURL(file);
                    setShowData((prev) => ({
                      ...prev,
                      showImagePreview: imageURL,
                      image: file,
                    }));
                  }
                }}
              />
              {errors.imageCover && <p className="text-sm text-red mt-1">{errors.imageCover}</p>}
            </div>
          </div>
        </div>
      </ContentWrapper>

      <Button onClick={handleSumbit} className="mt-10 self-end">
        Create Show
      </Button>
    </ContentWrapper>
  );
};

export default CreateShow;
