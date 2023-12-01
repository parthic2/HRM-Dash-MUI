import { useEffect, useState } from "react";

const AnnouncementFormLogic = (announcementData, editAnnoId) => {
  const initialFormValue = {
    anno_title: "",
    anno_detail: "",
    department: "",
    doc: ""
  }

  const [formData, setFormData] = useState(initialFormValue);
  const [errors, setErrors] = useState(initialFormValue);

  const validateField = (name, value) => {
    switch (name) {
      case "anno_title":
        if (value.trim() === "") {
          return "Announcement title is required";
        } else if (!/^[A-Za-z\s]+$/.test(value)) {
          return "Announcement title should contain only characters";
        }
        break;
      case "anno_detail":
        if (value.trim() === "") {
          return "Announcement Detail is required";
        }
        break;
      case "department":
        if (value === "" || value === "select department") {
          return "Department is required";
        }
        break;
    }

    return "";
  }

  const validateForm = () => {
    const newErrors = {};
    Object.keys(initialFormValue).forEach((name) => {
      const value = formData[name];
      const error = validateField(name, value);
      newErrors[name] = error;
    });

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    const error = validateField(name, value);

    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const handleImageChange = (files) => {
    setFormData({
      ...formData,
      doc: files[0] // Store the selected image
    });
  };

  useEffect(() => {
    const selectedAnnouncement = announcementData.find((anno) => anno.id === editAnnoId);

    if (selectedAnnouncement) {
      setFormData(selectedAnnouncement);
    } else {
      setFormData({
        ...initialFormValue
      });
    }
  }, [editAnnoId, announcementData]);

  return {
    handleInputChange,
    handleImageChange,
    formData,
    errors,
    validateForm,
    setFormData,
    initialFormValue
  }
}

export default AnnouncementFormLogic;