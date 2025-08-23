export const ContactvalidateForm = (formData) => {
    const errors = {};

    // Name validation
    if (!formData.name || formData.name.trim() === "") {
        errors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
        errors.name = "Name must be at least 2 characters long";
    }

    // Email validation
    if (!formData.email || formData.email.trim() === "") {
        errors.email = "Email is required";
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            errors.email = "Please enter a valid email address";
        }
    }

    // Subject validation
    if (!formData.subject || formData.subject.trim() === "") {
        errors.subject = "Subject is required";
    } else if (formData.subject.trim().length < 5) {
        errors.subject = "Subject must be at least 5 characters long";
    }

    // Message validation
    if (!formData.message || formData.message.trim() === "") {
        errors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
        errors.message = "Message must be at least 10 characters long";
    }

    return errors;
};
