import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import NestedArray from "shared/forms/nestedArray";

function FieldArray() {
  const { register, control, handleSubmit, reset, trigger, setError } = useForm(
    {
      // defaultValues: {}; you can populate the fields by this attribute
    }
  );
  const { fields, append, remove } = useFieldArray({
    control,
    name: "test",
  });

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <ul>
        {fields.map((item, index) => (
          <>
            <li key={item.id}>
              <input {...register(`test.${index}.firstName`)} />
              <Controller
                render={({ field }) => <input {...field} />}
                name={`test.${index}.lastName`}
                control={control}
              />
              <button type="button" onClick={() => remove(index)}>
                Delete
              </button>
            </li>
            <p>o</p>
            <NestedArray nestIndex={index} {...{ control, register }} />
          </>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => append({ firstName: "bill", lastName: "luo" })}
      >
        append
      </button>
      <input type="submit" />
    </form>
  );
}

export default FieldArray;
