import React, { useState } from "react";

const HomePage = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState({
    company: {
      name: "",
      goal: "",
      logoUrl: "",
    },
    theme: {
      theme: "light",
      color: "",
    },
    header: {
      headerTemplateID: "",
      companyName: "",
      logoUrl: "",
      menuItems: [],
      actionButton: { label: "", link: "" },
    },
    hero: {
      heroTemplateID: "",
      topic: "",
      title: "",
      para: "",
      buttons: [],
      imageUrl: "",
    },
    features: {
      featuresTemplateID: "",
      title: "",
      description: "",
      items: [],
    },
    products: {
      productsTemplateID: "",
      list: [],
    },
    teamMembers: {
      teamMembersTemplateID: "",
      Members: [],
    },
    callToAction: {
      callToActionTemplateID: "",
      heading: "",
      subheading: "",
      buttonText: "",
      buttonText1: "",
    },
    footer: {
      footerTemplateID: "",
      companyName: "",
      companyDescription1: "",
      companyDescription2: "",
      contactsTitle: "",
      phoneLabel: "",
      phone: "",
      emailLabel: "",
      email: "",
      addressLabel: "",
      address: "",
      socialTitle: "",
      socialDescription: "",
      copyright: "",
      faq: "",
      privacyPolicy: "",
      termsAndConditions: "",
      icons: {
        company: "",
        twitter: "",
        instagram: "",
        facebook: "",
      },
    },
    websitedetails : {
      uniqueID: ""
    }
  });

  const handleInputChange = (section, field, value, index) => {
    if (index !== undefined) {
      setFormData({
        ...formData,
        [section]: {
          ...formData[section],
          [field]: formData[section][field].map((item, i) =>
            i === index ? { ...item, ...value } : item
          ),
        },
      });
    } else {
      setFormData({
        ...formData,
        [section]: {
          ...formData[section],
          [field]: value,
        },
      });
    }
  };

  const [showReview, setShowReview] = useState(false); // State to toggle between form and review

  // Function to toggle between form and review sections
  const toggleReview = () => {
    setShowReview(!showReview);
  };

  const addItem = (section, field) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [field]: [...formData[section][field], {}],
      },
    });
  };

  const handleTemplateSelection = (section, templateID) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [`${section}TemplateID`]: templateID,
      },
    });
  };

  const templateSelectionImages = (section, templates) => (
    <div className="flex space-x-4 mb-4">
      {templates.map((template) => (
        <img
          key={template}
          src={`https://via.placeholder.com/150?text=${template}`}
          alt={template}
          className={`cursor-pointer border-2 ${
            formData[section][`${section}TemplateID`] === template
              ? "border-green-400"
              : "border-gray-300"
          }`}
          onClick={() => handleTemplateSelection(section, template)}
        />
      ))}
    </div>
  );

  const generateContent = async (section) => {
    const { name, goal, logoUrl } = formData.company;
    const response = await fetch(`http://localhost:5000/${section}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ companyName: name, logoUrl, goal }),
    });
    const data = await response.json();
    setFormData({
      ...formData,
      [section]: data[`${section}Config`],
    });
  };

  const handleSubmit = async () => {
    // Construct the data to match the required format
    const postData = {
      darkMode: formData.theme.theme === "dark",
      color: formData.theme.color,
      uniqueID: formData.websitedetails.uniqueID,
      header: {
        headerTemplateID: formData.header.headerTemplateID,
        companyName: formData.header.companyName,
        logoUrl: formData.header.logoUrl,
        menuItems: formData.header.menuItems.map((item, index) => ({
          ...item,
          _id: `menu${index}`,
        })),
        actionButton: {
          ...formData.header.actionButton,
        },
      },
      hero: {
        heroTemplateID: formData.hero.heroTemplateID,
        topic: formData.hero.topic,
        title: formData.hero.title,
        para: formData.hero.para,
        buttons: formData.hero.buttons.map((button, index) => ({
          ...button,
          _id: `heroButton${index}`,
        })),
        imageUrl: formData.hero.imageUrl,
      },
      features: {
        featuresTemplateID: formData.features.featuresTemplateID,
        title: formData.features.title,
        description: formData.features.description,
        items: formData.features.items.map((item, index) => ({
          ...item,
          _id: `feature${index}`,
        })),
      },
      products: {
        productsTemplateID: formData.products.productsTemplateID,
        list: formData.products.list.map((product, index) => ({
          ...product,
          _id: `product${index}`,
        })),
      },
      teamMembers: {
        teamMembersTemplateID: formData.teamMembers.teamMembersTemplateID,
        Members: formData.teamMembers.Members.map((member, index) => ({
          ...member,
          _id: `teamMember${index}`,
        })),
      },
      callToAction: {
        callToActionTemplateID: formData.callToAction.callToActionTemplateID,
        heading: formData.callToAction.heading,
        subheading: formData.callToAction.subheading,
        buttonText: formData.callToAction.buttonText,
        buttonText1: formData.callToAction.buttonText1,
      },
      footer: {
        footerTemplateID: formData.footer.footerTemplateID,
        companyName: formData.footer.companyName,
        companyDescription1: formData.footer.companyDescription1,
        companyDescription2: formData.footer.companyDescription2,
        contactsTitle: formData.footer.contactsTitle,
        phoneLabel: formData.footer.phoneLabel,
        phone: formData.footer.phone,
        emailLabel: formData.footer.emailLabel,
        email: formData.footer.email,
        addressLabel: formData.footer.addressLabel,
        address: formData.footer.address,
        socialTitle: formData.footer.socialTitle,
        socialDescription: formData.footer.socialDescription,
        copyright: formData.footer.copyright,
        faq: formData.footer.faq,
        privacyPolicy: formData.footer.privacyPolicy,
        termsAndConditions: formData.footer.termsAndConditions,
        icons: {
          company: formData.footer.icons.company,
          twitter: formData.footer.icons.twitter,
          instagram: formData.footer.icons.instagram,
          facebook: formData.footer.icons.facebook,
        },
      },
    };
  
    try {
      const response = await fetch("http://localhost:5050/api/justprompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        alert("Form submitted successfully!");
      } else {
        console.error("Error submitting form", response.statusText);
        alert("Failed to submit the form. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form", error);
      alert("An error occurred while submitting the form. Please try again.");
    }
  };
  

  const sections = [
    {
      title: "Company Information",
      content: (
        <>
          <label className="block mb-2">Company Name</label>
          <input
            type="text"
            className="mb-4 p-2 w-full border rounded"
            value={formData.company.name}
            onChange={(e) =>
              handleInputChange("company", "name", e.target.value)
            }
          />
          <label className="block mb-2">Company Goal</label>
          <input
            type="text"
            className="mb-4 p-2 w-full border rounded"
            value={formData.company.goal}
            onChange={(e) =>
              handleInputChange("company", "goal", e.target.value)
            }
          />
          <label className="block mb-2">Logo URL</label>
          <input
            type="text"
            className="mb-4 p-2 w-full border rounded"
            value={formData.company.logoUrl}
            onChange={(e) =>
              handleInputChange("company", "logoUrl", e.target.value)
            }
          />
        </>
      ),
    },
    {
      title: "Theme Selection",
      content: (
        <>
          <label className="block mb-2">Theme</label>
          <select
            className="mb-4 p-2 w-full border rounded"
            value={formData.theme.theme}
            onChange={(e) =>
              handleInputChange("theme", "theme", e.target.value)
            }
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
          <label className="block mb-2">Color Theme</label>
          <input
            type="color"
            className="mb-4 p-2 w-full border rounded"
            value={formData.theme.color}
            onChange={(e) =>
              handleInputChange("theme", "color", e.target.value)
            }
          />
        </>
      ),
    },
    {
      title: "Header Section",
      content: (
        <>
          <button
            type="button"
            className="float-right mb-4 px-4 py-2 bg-green-400 text-white rounded"
            onClick={() => generateContent("header")}
          >
            Generate Content
          </button>
          <label className="block mb-2">Header Template ID</label>
          {templateSelectionImages("header", ["header1", "header2", "header3"])}
          <label className="block mb-2">Company Name</label>
          <input
            type="text"
            className="mb-4 p-2 w-full border rounded"
            value={formData.header.companyName}
            onChange={(e) =>
              handleInputChange("header", "companyName", e.target.value)
            }
          />
          <label className="block mb-2">Logo URL</label>
          <input
            type="text"
            className="mb-4 p-2 w-full border rounded"
            value={formData.header.logoUrl}
            onChange={(e) =>
              handleInputChange("header", "logoUrl", e.target.value)
            }
          />
          <label className="block mb-2">Menu Items</label>
          {formData.header.menuItems.map((item, index) => (
            <div key={index} className="mb-2 flex space-x-2">
              <input
                type="text"
                className="p-2 w-1/2 border rounded"
                placeholder="Label"
                value={item.label}
                onChange={(e) =>
                  handleInputChange(
                    "header",
                    "menuItems",
                    { label: e.target.value },
                    index
                  )
                }
              />
              <input
                type="text"
                className="p-2 w-1/2 border rounded"
                placeholder="Link"
                value={item.link}
                onChange={(e) =>
                  handleInputChange(
                    "header",
                    "menuItems",
                    { link: e.target.value },
                    index
                  )
                }
              />
            </div>
          ))}
          <button
            type="button"
            className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
            onClick={() => addItem("header", "menuItems")}
          >
            Add Menu Item
          </button>
          <label className="block mb-2">Action Button</label>
          <input
            type="text"
            className="mb-4 p-2 w-full border rounded"
            placeholder="Label"
            value={formData.header.actionButton.label}
            onChange={(e) =>
              handleInputChange("header", "actionButton", {
                label: e.target.value,
              })
            }
          />
          <input
            type="text"
            className="mb-4 p-2 w-full border rounded"
            placeholder="Link"
            value={formData.header.actionButton.link}
            onChange={(e) =>
              handleInputChange("header", "actionButton", {
                link: e.target.value,
              })
            }
          />
        </>
      ),
    },
    {
      title: "Hero Section",
      content: (
        <>
          <button
            type="button"
            className="float-right mb-4 px-4 py-2 bg-green-400 text-white rounded"
            onClick={() => generateContent("hero")}
          >
            Generate Content
          </button>
          <label className="block mb-2">Hero Template ID</label>
          {templateSelectionImages("hero", ["hero1", "hero2", "hero3"])}
          <label className="block mb-2">Topic</label>
          <input
            type="text"
            className="mb-4 p-2 w-full border rounded"
            value={formData.hero.topic}
            onChange={(e) => handleInputChange("hero", "topic", e.target.value)}
          />
          <label className="block mb-2">Title</label>
          <input
            type="text"
            className="mb-4 p-2 w-full border rounded"
            value={formData.hero.title}
            onChange={(e) => handleInputChange("hero", "title", e.target.value)}
          />
          <label className="block mb-2">Paragraph</label>
          <textarea
            className="mb-4 p-2 w-full border rounded"
            value={formData.hero.para}
            onChange={(e) => handleInputChange("hero", "para", e.target.value)}
          />
          <label className="block mb-2">Buttons</label>
          {formData.hero.buttons.map((button, index) => (
            <div key={index} className="mb-2 flex space-x-2">
              <input
                type="text"
                className="p-2 w-1/2 border rounded"
                placeholder="Label"
                value={button.label}
                onChange={(e) =>
                  handleInputChange(
                    "hero",
                    "buttons",
                    { label: e.target.value },
                    index
                  )
                }
              />
              <input
                type="text"
                className="p-2 w-1/2 border rounded"
                placeholder="Link"
                value={button.link}
                onChange={(e) =>
                  handleInputChange(
                    "hero",
                    "buttons",
                    { link: e.target.value },
                    index
                  )
                }
              />
            </div>
          ))}
          <button
            type="button"
            className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
            onClick={() => addItem("hero", "buttons")}
          >
            Add Button
          </button>
          <label className="block mb-2">Image URL</label>
          <input
            type="text"
            className="mb-4 p-2 w-full border rounded"
            value={formData.hero.imageUrl}
            onChange={(e) =>
              handleInputChange("hero", "imageUrl", e.target.value)
            }
          />
        </>
      ),
    },
    {
      title: "Features Section",
      content: (
        <>
          <button
            type="button"
            className="float-right mb-4 px-4 py-2 bg-green-400 text-white rounded"
            onClick={() => generateContent("features")}
          >
            Generate Content
          </button>
          <label className="block mb-2">Features Template ID</label>
          {templateSelectionImages("features", [
            "features1",
            "features2",
            "features3",
          ])}
          <label className="block mb-2">Title</label>
          <input
            type="text"
            className="mb-4 p-2 w-full border rounded"
            value={formData.features.title}
            onChange={(e) =>
              handleInputChange("features", "title", e.target.value)
            }
          />
          <label className="block mb-2">Description</label>
          <textarea
            className="mb-4 p-2 w-full border rounded"
            value={formData.features.description}
            onChange={(e) =>
              handleInputChange("features", "description", e.target.value)
            }
          />
          <label className="block mb-2">Items</label>
          {formData.features.items.map((item, index) => (
            <div key={index} className="mb-2 flex space-x-2">
              <input
                type="text"
                className="p-2 w-1/2 border rounded"
                placeholder="Title"
                value={item.title}
                onChange={(e) =>
                  handleInputChange(
                    "features",
                    "items",
                    { title: e.target.value },
                    index
                  )
                }
              />
              <textarea
                className="p-2 w-1/2 border rounded"
                placeholder="Description"
                value={item.description}
                onChange={(e) =>
                  handleInputChange(
                    "features",
                    "items",
                    { description: e.target.value },
                    index
                  )
                }
              />
            </div>
          ))}
          <button
            type="button"
            className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
            onClick={() => addItem("features", "items")}
          >
            Add Item
          </button>
        </>
      ),
    },
    {
      title: "Products Section",
      content: (
        <>
          <button
            type="button"
            className="float-right mb-4 px-4 py-2 bg-green-400 text-white rounded"
            onClick={() => generateContent("products")}
          >
            Generate Content
          </button>
          <label className="block mb-2">Products Template ID</label>
          {templateSelectionImages("products", [
            "products1",
            "products2",
            "products3",
          ])}
          <label className="block mb-2">Products</label>
          {formData.products.list.map((product, index) => (
            <div key={index} className="mb-2 flex space-x-2">
              <input
                type="text"
                className="p-2 w-1/2 border rounded"
                placeholder="Product Name"
                value={product.name}
                onChange={(e) =>
                  handleInputChange(
                    "products",
                    "list",
                    { name: e.target.value },
                    index
                  )
                }
              />
              <input
                type="text"
                className="p-2 w-1/2 border rounded"
                placeholder="Product Description"
                value={product.description}
                onChange={(e) =>
                  handleInputChange(
                    "products",
                    "list",
                    { description: e.target.value },
                    index
                  )
                }
              />
            </div>
          ))}
          <button
            type="button"
            className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
            onClick={() => addItem("products", "list")}
          >
            Add Product
          </button>
        </>
      ),
    },
    {
      title: "Call to Action Section",
      content: (
        <>
          <button
            type="button"
            className="float-right mb-4 px-4 py-2 bg-green-400 text-white rounded"
            onClick={() => generateContent("callToAction")}
          >
            Generate Content
          </button>
          <label className="block mb-2">callToAction Template ID</label>
          {templateSelectionImages("callToAction", [
            "callToAction1",
            "callToAction2",
            "callToAction3",
          ])}
          <label className="block mb-2">Heading</label>
          <input
            type="text"
            className="mb-4 p-2 w-full border rounded"
            value={formData.callToAction.heading}
            onChange={(e) =>
              handleInputChange("callToAction", "heading", e.target.value)
            }
          />
          <label className="block mb-2">Subheading</label>
          <input
            type="text"
            className="mb-4 p-2 w-full border rounded"
            value={formData.callToAction.subheading}
            onChange={(e) =>
              handleInputChange("callToAction", "subheading", e.target.value)
            }
          />
          <label className="block mb-2">Button Text</label>
          <input
            type="text"
            className="mb-4 p-2 w-full border rounded"
            value={formData.callToAction.buttonText}
            onChange={(e) =>
              handleInputChange("callToAction", "buttonText", e.target.value)
            }
          />
          <input
            type="text"
            className="mb-4 p-2 w-full border rounded"
            value={formData.callToAction.buttonText1}
            onChange={(e) =>
              handleInputChange("callToAction", "buttonText1", e.target.value)
            }
          />
        </>
      ),
    },
    {
      title: "Team Members Section",
      content: (
        <>
          <button
            type="button"
            className="float-right mb-4 px-4 py-2 bg-green-400 text-white rounded"
            onClick={() => generateContent("teamMembers")}
          >
            Generate Content
          </button>
          <label className="block mb-2">Team Members Template ID</label>
          {templateSelectionImages("teamMembers", ["team1", "team2", "team3"])}
          <label className="block mb-2">Members</label>
          {formData.teamMembers.Members.map((member, index) => (
            <div key={index} className="mb-2 flex space-x-2">
              <input
                type="text"
                className="p-2 w-1/2 border rounded"
                placeholder="Member Name"
                value={member.name}
                onChange={(e) =>
                  handleInputChange(
                    "teamMembers",
                    "Members",
                    { name: e.target.value },
                    index
                  )
                }
              />
              <input
                type="text"
                className="p-2 w-1/2 border rounded"
                placeholder="Member Role"
                value={member.role}
                onChange={(e) =>
                  handleInputChange(
                    "teamMembers",
                    "Members",
                    { role: e.target.value },
                    index
                  )
                }
              />
            </div>
          ))}
          <button
            type="button"
            className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
            onClick={() => addItem("teamMembers", "Members")}
          >
            Add Member
          </button>
        </>
      ),
    },
    {
      title: "Footer Section",
      content: (
        <>
          <button
            type="button"
            className="float-right mb-4 px-4 py-2 bg-green-400 text-white rounded"
            onClick={() => generateContent("footer")}
          >
            Generate Content
          </button>
          <label className="block mb-2">Footer Template ID</label>
          {templateSelectionImages("footer", ["footer1", "footer2", "footer3"])}
          <label className="block mb-2">Company Name</label>
          <input
            type="text"
            className="mb-4 p-2 w-full border rounded"
            value={formData.footer.companyName}
            onChange={(e) =>
              handleInputChange("footer", "companyName", e.target.value)
            }
          />
          <label className="block mb-2">Company Description 1</label>
          <textarea
            className="mb-4 p-2 w-full border rounded"
            value={formData.footer.companyDescription1}
            onChange={(e) =>
              handleInputChange("footer", "companyDescription1", e.target.value)
            }
          />
          <label className="block mb-2">Company Description 2</label>
          <textarea
            className="mb-4 p-2 w-full border rounded"
            value={formData.footer.companyDescription2}
            onChange={(e) =>
              handleInputChange("footer", "companyDescription2", e.target.value)
            }
          />
          <label className="block mb-2">Contacts Title</label>
          <input
            type="text"
            className="mb-4 p-2 w-full border rounded"
            value={formData.footer.contactsTitle}
            onChange={(e) =>
              handleInputChange("footer", "contactsTitle", e.target.value)
            }
          />
          <label className="block mb-2">Phone Label</label>
          <input
            type="text"
            className="mb-4 p-2 w-full border rounded"
            value={formData.footer.phoneLabel}
            onChange={(e) =>
              handleInputChange("footer", "phoneLabel", e.target.value)
            }
          />
          <label className="block mb-2">Phone</label>
          <input
            type="text"
            className="mb-4 p-2 w-full border rounded"
            value={formData.footer.phone}
            onChange={(e) =>
              handleInputChange("footer", "phone", e.target.value)
            }
          />
          <label className="block mb-2">Email Label</label>
          <input
            type="text"
            className="mb-4 p-2 w-full border rounded"
            value={formData.footer.emailLabel}
            onChange={(e) =>
              handleInputChange("footer", "emailLabel", e.target.value)
            }
          />
          <label className="block mb-2">Email</label>
          <input
            type="text"
            className="mb-4 p-2 w-full border rounded"
            value={formData.footer.email}
            onChange={(e) =>
              handleInputChange("footer", "email", e.target.value)
            }
          />
          <label className="block mb-2">Address Label</label>
          <input
            type="text"
            className="mb-4 p-2 w-full border rounded"
            value={formData.footer.addressLabel}
            onChange={(e) =>
              handleInputChange("footer", "addressLabel", e.target.value)
            }
          />
          <label className="block mb-2">Address</label>
          <input
            type="text"
            className="mb-4 p-2 w-full border rounded"
            value={formData.footer.address}
            onChange={(e) =>
              handleInputChange("footer", "address", e.target.value)
            }
          />
          <label className="block mb-2">Social Title</label>
          <input
            type="text"
            className="mb-4 p-2 w-full border rounded"
            value={formData.footer.socialTitle}
            onChange={(e) =>
              handleInputChange("footer", "socialTitle", e.target.value)
            }
          />
          <label className="block mb-2">Social Description</label>
          <textarea
            className="mb-4 p-2 w-full border rounded"
            value={formData.footer.socialDescription}
            onChange={(e) =>
              handleInputChange("footer", "socialDescription", e.target.value)
            }
          />
          <label className="block mb-2">Copyright</label>
          <input
            type="text"
            className="mb-4 p-2 w-full border rounded"
            value={formData.footer.copyright}
            onChange={(e) =>
              handleInputChange("footer", "copyright", e.target.value)
            }
          />
          <label className="block mb-2">FAQ</label>
          <input
            type="text"
            className="mb-4 p-2 w-full border rounded"
            value={formData.footer.faq}
            onChange={(e) => handleInputChange("footer", "faq", e.target.value)}
          />
          <label className="block mb-2">Privacy Policy</label>
          <input
            type="text"
            className="mb-4 p-2 w-full border rounded"
            value={formData.footer.privacyPolicy}
            onChange={(e) =>
              handleInputChange("footer", "privacyPolicy", e.target.value)
            }
          />
          <label className="block mb-2">Terms and Conditions</label>
          <input
            type="text"
            className="mb-4 p-2 w-full border rounded"
            value={formData.footer.termsAndConditions}
            onChange={(e) =>
              handleInputChange("footer", "termsAndConditions", e.target.value)
            }
          />
          <label className="block mb-2">Icons</label>
          <div className="mb-2 flex space-x-2">
            <input
              type="text"
              className="p-2 w-1/4 border rounded"
              placeholder="Company Icon"
              value={formData.footer.icons.company}
              onChange={(e) =>
                handleInputChange("footer", "icons", {
                  company: e.target.value,
                })
              }
            />
            <input
              type="text"
              className="p-2 w-1/4 border rounded"
              placeholder="Twitter Icon"
              value={formData.footer.icons.twitter}
              onChange={(e) =>
                handleInputChange("footer", "icons", {
                  twitter: e.target.value,
                })
              }
            />
            <input
              type="text"
              className="p-2 w-1/4 border rounded"
              placeholder="Instagram Icon"
              value={formData.footer.icons.instagram}
              onChange={(e) =>
                handleInputChange("footer", "icons", {
                  instagram: e.target.value,
                })
              }
            />
            <input
              type="text"
              className="p-2 w-1/4 border rounded"
              placeholder="Facebook Icon"
              value={formData.footer.icons.facebook}
              onChange={(e) =>
                handleInputChange("footer", "icons", {
                  facebook: e.target.value,
                })
              }
            />
          </div>
        </>
      ),
    },
    {
      title: "Website Details",
      content: (
        <>
          <label className="block mb-2">Name your website</label>
          <input
            type="text"
            className="mb-4 p-2 w-full border rounded"
            value={formData.websitedetails.uniqueID}
            onChange={(e) =>
              handleInputChange("websitedetails", "uniqueID", e.target.value)
            }
          />
          <p className="text-gray-500 text-sm">
            This will be the title of your website
          </p>
          <p className="text-gray-500 text-sm">
            Final your looks like this:{" "}<span className="text-green-400 text-sm">https://justprompted.vercel.app/{formData.websitedetails.uniqueID}</span>
          </p>
        </>
      ),      
    }
  ];

  const handleNext = () => {
    // Function to navigate to the next section
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePrevious = () => {
    // Function to navigate to the previous section
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  return (
    <div className="container mx-auto p-12">
      <h1 className="text-2xl font-bold mb-4">Create Your Website</h1>

      {/* Pass setCurrentSection to Stepper component */}
      <Stepper
        currentSection={currentSection}
        sections={sections}
        setCurrentSection={setCurrentSection}
      />

      {/* Conditional rendering based on showReview state */}
      {!showReview ? (
        <div>
          {sections[currentSection].content}

          {/* Navigation buttons */}
          <div className="flex justify-between mt-4">
            <button
              className="bg-[#666666] hover:bg-[#343434] text-white font-bold py-2 px-4 rounded"
              onClick={handlePrevious}
              disabled={currentSection === 0}
            >
              Previous
            </button>
            {currentSection === sections.length - 1 ? (
              <button
                className="bg-green-400 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={toggleReview}
              >
                Review
              </button>
            ) : (
              <button
                className="bg-green-400 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleNext}
              >
                Next
              </button>
            )}
          </div>
        </div>
      ) : (
        <div>
          {/* Review section */}
          <h2 className="text-xl font-semibold mb-4">Review Your Entries</h2>
          <div className="mb-4">
            <div className="container mx-auto p-4">
              <h1 className="text-2xl font-bold mb-4">Form Data</h1>
              <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  {/* Company */}
                  <tbody>
                    <tr className="bg-gray-50">
                      <td
                        colSpan="2"
                        className="px-6 py-3 text-sm font-medium text-gray-700 uppercase tracking-wider"
                      >
                        Company
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                        Name
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {formData.company.name}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                        Goal
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {formData.company.goal}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                        Logo URL
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <a
                          href={formData.company.logoUrl}
                          className="text-blue-500 underline"
                        >
                          {formData.company.logoUrl}
                        </a>
                      </td>
                    </tr>
                  </tbody>

                  {/* Theme */}
                  <tbody className="bg-gray-50">
                    <tr>
                      <td
                        colSpan="2"
                        className="px-6 py-3 text-sm font-medium text-gray-700 uppercase tracking-wider"
                      >
                        Theme
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                        Theme
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {formData.theme.theme}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                        Color
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {formData.theme.color}
                      </td>
                    </tr>
                  </tbody>

                  {/* Header */}
                  <tbody>
                    <tr className="bg-gray-50">
                      <td
                        colSpan="2"
                        className="px-6 py-3 text-sm font-medium text-gray-700 uppercase tracking-wider"
                      >
                        Header
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                        Header Template ID
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {formData.header.headerTemplateID}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                        Company Name
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {formData.header.companyName}
                      </td>
                    </tr>
                  </tbody>

                  {/* Hero */}
                  <tbody className="bg-gray-50">
                    <tr>
                      <td
                        colSpan="2"
                        className="px-6 py-3 text-sm font-medium text-gray-700 uppercase tracking-wider"
                      >
                        Hero
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                        Hero Template ID
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {formData.hero.heroTemplateID}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                        Topic
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {formData.hero.topic}
                      </td>
                    </tr>
                  </tbody>

                  {/* Features */}
                  <tbody>
                    <tr className="bg-gray-50">
                      <td
                        colSpan="2"
                        className="px-6 py-3 text-sm font-medium text-gray-700 uppercase tracking-wider"
                      >
                        Features
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                        Features Template ID
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {formData.features.featuresTemplateID}
                      </td>
                    </tr>
                    {formData.features.items.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                          Feature {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <i className={`${item.iconClass} text-2xl mr-2`} />
                            <div>
                              <div className="font-medium">{item.title}</div>
                              <div className="text-gray-700">
                                {item.description}
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>

                  {/* Products */}
                  <tbody className="bg-gray-50">
                    <tr>
                      <td
                        colSpan="2"
                        className="px-6 py-3 text-sm font-medium text-gray-700 uppercase tracking-wider"
                      >
                        Products
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                        Products Template ID
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {formData.products.productsTemplateID}
                      </td>
                    </tr>
                    {formData.products.list.map((product, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                          Product {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {product}
                        </td>
                      </tr>
                    ))}
                  </tbody>

                  {/* Team Members */}
                  <tbody>
                    <tr className="bg-gray-50">
                      <td
                        colSpan="2"
                        className="px-6 py-3 text-sm font-medium text-gray-700 uppercase tracking-wider"
                      >
                        Team Members
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                        Team Members Template ID
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {formData.teamMembers.teamMembersTemplateID}
                      </td>
                    </tr>
                    {formData.teamMembers.Members.map((member, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                          Member {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {member}
                        </td>
                      </tr>
                    ))}
                  </tbody>

                  {/* Call to Action */}
                  <tbody className="bg-gray-50">
                    <tr>
                      <td
                        colSpan="2"
                        className="px-6 py-3 text-sm font-medium text-gray-700 uppercase tracking-wider"
                      >
                        Call to Action
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                        Call to Action Template ID
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {formData.callToAction.callToActionTemplateID}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                        Heading
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {formData.callToAction.heading}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                        Subheading
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {formData.callToAction.subheading}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                        Button Text
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {formData.callToAction.buttonText}
                      </td>
                    </tr>
                  </tbody>

                  {/* Footer */}
                  <tbody>
                    <tr className="bg-gray-50">
                      <td
                        colSpan="2"
                        className="px-6 py-3 text-sm font-medium text-gray-700 uppercase tracking-wider"
                      >
                        Footer
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                        Footer Template ID
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {formData.footer.footerTemplateID}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                        Company Name
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {formData.footer.companyName}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                        Company Description 1
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {formData.footer.companyDescription1}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                        Company Description 2
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {formData.footer.companyDescription2}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                        Contacts
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p>
                            {formData.footer.phoneLabel}:{" "}
                            {formData.footer.phone}
                          </p>
                          <p>
                            {formData.footer.emailLabel}:{" "}
                            {formData.footer.email}
                          </p>
                          <p>
                            {formData.footer.addressLabel}:{" "}
                            {formData.footer.address}
                          </p>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                        Social
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p>{formData.footer.socialDescription}</p>
                          <p>
                            <i className={formData.footer.icons.company}></i>
                            <i className={formData.footer.icons.twitter}></i>
                            <i className={formData.footer.icons.instagram}></i>
                            <i className={formData.footer.icons.facebook}></i>
                          </p>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                        Legal
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p>
                            <a href={formData.footer.faq}>FAQ</a>
                          </p>
                          <p>
                            <a href={formData.footer.privacyPolicy}>
                              Privacy Policy
                            </a>
                          </p>
                          <p>
                            <a href={formData.footer.termsAndConditions}>
                              Terms & Conditions
                            </a>
                          </p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Submission button */}
          <div className="flex justify-between mt-4">
            <button
              className="bg-green-400 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={toggleReview}
            >
              Edit
            </button>
            <button
              className="bg-green-400 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Stepper = ({ currentSection, sections, setCurrentSection }) => (
  <div className="p-4 space-y-2">
    <h3 className="text-base font-semibold">
      Step {currentSection + 1}: {sections[currentSection].title}
    </h3>
    <div className="flex w-full space-x-3">
      {sections.map((section, index) => (
        <button
          key={index}
          onClick={() => setCurrentSection(index)}
          className={`flex-1 h-2 rounded-full ${
            currentSection === index
              ? "bg-green-400 cursor-pointer"
              : index < currentSection
              ? "bg-green-400 cursor-pointer"
              : "bg-gray-400 cursor-pointer"
          }`}
        />
      ))}
    </div>
  </div>
);

export default HomePage;
