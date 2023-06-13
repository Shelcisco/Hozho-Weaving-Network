import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { EDIT_THOUGHT} from '../../utils/mutations';
import Dropzone from 'react-dropzone'
import { useNavigate } from "react-router-dom";


const EditThoughtForm = (props) => {
  const [thoughtText, setText] = useState(props.edit.thoughtText);
  const [characterCount, setCharacterCount] = useState(0);
  const [image, setSelectedFile] = useState(props.edit.image);

  const [editThought, { error }] = useMutation(EDIT_THOUGHT)

  const navigate = useNavigate();
  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64Data = reader.result
      setSelectedFile(base64Data)
    }
    reader.readAsDataURL(file)
  };
  // update state based on form input changes
  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setText(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      if (image) {
          await editThought({
            variables: { thoughtId: props.edit.id, thoughtText, image },
          });
      } else {
        await editThought({ variables: { thoughtId: props.edit.id, thoughtText } });
      }

      // clear form values
      setCharacterCount(0);
      setText('');
      setSelectedFile(null);
      navigate('/');

    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div>
      <p
        className={`m-0 ${characterCount === 280 || error ? "text-error" : ""}`}
      >
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder="Share your art and thoughts..."
          value={thoughtText}
          className="form-input col-12 col-md-9"
          onChange={handleChange}
        ></textarea>
        <button
          className="btn col-12 col-md-3"
          type="submit"
          onClick={() => handleFormSubmit}
        >
          Submit
        </button>
        <Dropzone onDrop={handleDrop} accept=".jpeg, .png, .jpg">
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {image ? (
                <img src={image} alt="Preview" />
              ) : (
                <p>Drag and drop your image here or click to select files!</p>
              )}
            </div>
          )}
        </Dropzone>
      </form>
    </div>
  );
};

export default EditThoughtForm;
