/* eslint-disable no-unused-vars */
import React from "react";
import ayudiaPhoto from "/src/assets/ayudia-photo.png";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMenuDetail, updateMenu } from "../redux/action/menu";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

const EditMenu = () => {
  const menu_detail = useSelector((state) => state.menu_detail);
  const menu_update = useSelector((state) => state.menu_update);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState();
  const [inputData, setInputData] = useState({
    title: "",
    ingredient: "",
    category_id: "",
    photo_url: "",
  });

  useEffect(() => {
    dispatch(getMenuDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (menu_detail.data) {
      setInputData({
        title: menu_detail.data.title || "",
        ingredient: menu_detail.data.ingredient || "",
        category_id: menu_detail.data.category_id || "",
        photo_url: menu_detail.data.photo_url || "",
      });
    }
  }, [menu_detail]);

  const updateData = (event) => {
    event.preventDefault();
    let bodyData = new FormData();
    bodyData.append("title", inputData.title);
    bodyData.append("ingredient", inputData.ingredient);
    bodyData.append("category_id", inputData.category_id);
    bodyData.append("photo", photo);

    dispatch(updateMenu(id, bodyData, navigate));
  };

  const onChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const onChangePhoto = (e) => {
    setPhoto(e.target.files[0]);
    e.target.files[0] &&
      setInputData({
        ...inputData,
        photo_url: URL.createObjectURL(e.target.files[0]),
      });
    console.log(e.target.files);
  };

  const handleButtonClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Navbar />
      <div className="edit-menu">
        {/* Content */}
        <div
          className="content container d-flex flex-column"
          style={{ marginTop: 50, marginBottom: 100 }}
        >
          {/* Notification */}
          {menu_detail.isLoading ? (
            <div className="alert alert-primary">Loading ...</div>
          ) : null}

          {/* body content */}
          <section className="row">
            {/* Input Recipe */}
            <form
              onSubmit={updateData}
              className="d-flex flex-column mt-4 mb-4"
            >
              {/* Photo */}
              <div className="d-flex flex-column mb-4">
                <label
                  htmlFor="photo"
                  className="form-label"
                  style={{ fontWeight: 500, fontSize: 20 }}
                >
                  Photo
                </label>
                <div className="upload-container d-flex flex-column align-items-center justify-content-center">
                  {photo ? (
                    <img
                      src={inputData.photo_url}
                      className="img-fluid"
                      alt=""
                      style={{ maxHeight: 250 }}
                    />
                  ) : (
                    <img
                      src={menu_detail.data?.photo}
                      className="img-fluid"
                      alt=""
                      style={{ maxHeight: 250 }}
                    />
                  )}
                </div>
                <input
                  type="file"
                  className="form-control"
                  id="photo"
                  onChange={onChangePhoto}
                />
              </div>

              {/* Title */}
              <label
                htmlFor="title"
                className="form-label"
                style={{ fontWeight: 500, fontSize: 20 }}
              >
                Title
              </label>
              <div className="d-flex flex-column mb-4">
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  placeholder="Title"
                  onChange={onChange}
                  value={inputData.title}
                />
              </div>

              {/* Ingredients */}
              <label
                htmlFor="ingredients"
                className="form-label"
                style={{ fontWeight: 500, fontSize: 20 }}
              >
                Ingredients
              </label>
              <div className="d-flex flex-column mb-4">
                <textarea
                  type="text"
                  className="form-control"
                  id="ingredient"
                  name="ingredient"
                  placeholder="Ingredients"
                  onChange={onChange}
                  rows={10}
                  style={{ whiteSpace: "pre-line" }}
                  value={inputData.ingredient}
                />
              </div>

              {/* Category */}
              <div className="d-flex flex-column mb-4 col-4">
                <label
                  htmlFor="category"
                  className="form-label"
                  style={{ fontWeight: 500, fontSize: 20 }}
                >
                  Category
                </label>
                <select
                  className="form-select"
                  id="category_id"
                  name="category_id"
                  onChange={onChange}
                  style={{ padding: 15 }}
                  value={
                    inputData.category_id
                      ? inputData?.category_id
                      : menu_detail.data?.category_id
                  }
                >
                  <option value="">Select category</option>
                  <option value="1">Desert</option>
                  <option value="2">Main Course</option>
                  <option value="3">Appetizer</option>
                </select>
              </div>

              {/* Notification */}
              {menu_update.isLoading ? (
                <div className="alert alert-primary">Loading ...</div>
              ) : null}
              {menu_update.isError ? (
                <div className="alert alert-danger">
                  Update menu failed: {menu_update.errorMessage ?? " - "}
                </div>
              ) : null}

              {/* Update Button */}
              <div className="d-flex flex-column align-items-center mt-5">
                <button
                  type="submit"
                  className="btn text-white"
                  style={{
                    padding: "10px 150px",
                    fontSize: 17,
                    backgroundColor: "#EFC81A",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#ceac18")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#EFC81A")
                  }
                >
                  Update
                </button>
              </div>
            </form>
          </section>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default EditMenu;
