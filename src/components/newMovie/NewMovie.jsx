import React, { useEffect, useState } from "react";
import "./newMovie.scss";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Select from "react-select";
import { addNewMovie } from "../../helpers/apiCalls";

const NewMovie = () => {
  const optionCategories = useSelector((state) => state.categories);
  const [categoryOptions, setCategoryOptions] = useState({
    value: "one",
    label: "one",
  });

  useEffect(() => {
    (async function () {
      setCategoryOptions(optionCategories.categories);
    })();
  }, []);

  console.log(categoryOptions);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const dataCategories = data.categories.map((item) => item.value);

    data.categories = dataCategories;

    console.log(data);

    const res = await addNewMovie(data)
    console.log(res)
  };

  return (
    <div className="formContainer">
      <h1>
        Add a new movie to <span> MovieNest </span>
      </h1>
      <div></div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="inputContainer">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            placeholder="title"
            maxLength={200}
            required
            {...register("title")}
          />
        </div>
        <div className="inputContainer">
          <label htmlFor="categories">Categories</label>
          <Controller
            control={control}
            {...register("categories", {})}
            render={({ field: { onChange } }) => (
              <Select
                onChange={onChange}
                isMulti
                required
                options={categoryOptions}
                name="categories"
                placeholder="categories"
              />
            )}
          />
        </div>
        <div className="inputContainer">
          <label htmlFor="publishDate">Publish Year</label>
          <input
            id="publishDate"
            type="number"
            placeholder="publish date"
            max={2024}
            min={1920}
            {...register("pub_date", {})}
          />
        </div>
        <div className="inputContainer">
          <label htmlFor="duration">Duration</label>
          <input
            type="number"
            placeholder="duration"
            max={32767}
            min={0}
            {...register("duration", {})}
          />
        </div>
        <div className="inputContainer">
          <label htmlFor="rating">Rating</label>

          <input
            id="rating"
            type="number"
            placeholder="rating"
            min={1}
            max={10}
            {...register("rating")}
          />
        </div>
        <div className="inputContainer">
          <label htmlFor="">Description</label>
          <textarea
            placeholder="description"
            rows="10"
            {...register("Description", {})}
          />
        </div>

        <input type="submit" />
      </form>
    </div>
  );
};

export default NewMovie;
