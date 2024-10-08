import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import DropdownPicker from "react-native-dropdown-picker";
import Footer from "./footer";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import CountryPicker from 'react-native-country-picker-modal';

const MultiStepForm = ({ navigation }) => {
  const [formData, setFormData] = useState({
    step: 1,
    business_description: "",
    business_size: "",
    business_category: "",
    business_name: "",
    firstName: "",
    lastName: "",
    email: "",
    phone_no: "",
  });

  const [openStep1, setOpenStep1] = useState(false);
  const [valueStep1, setValueStep1] = useState(null);

  const [openStep2, setOpenStep2] = useState(false);
  const [valueStep2, setValueStep2] = useState(null);

  const [openStep3, setOpenStep3] = useState(false);
  const [valueStep3, setValueStep3] = useState(null);

  const handleInputChange = (value, field) => {
    setFormData({ ...formData, [field]: value });
  };
//
//  const handleNextStep = () => {
//    setFormData({ ...formData, step: formData.step + 1 });
//  };

  const handlePreviousStep = () => {
    setFormData({ ...formData, step: formData.step - 1 });
  };

  const handleSubmit = () => {
    const formDataToSend = {
      business_description: valueStep1, // Use valueStep1 for dropdown value
      business_size: valueStep2, // Use valueStep2 for dropdown value
      business_category: valueStep3, // Use valueStep3 for dropdown value
      business_name: formData.business_name,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone_no: formData.phone_no,
    };

    axios.post("http://192.168.2.78:8080/api", formDataToSend)
      .then((response) => {
        console.log("Form submitted successfully:", response.data);
        navigation.navigate("CALCULATOR");
      })
      .catch((error) => {
        console.error("There was a problem with the form submission:", error);
      });
  };
  const handleNextStep = () => {
    if (formData.step === 1 && !valueStep1) {
      alert('Please select an Options');
      return;
    }
    if (formData.step === 2 && !valueStep2) {
      alert('Please select an Options');
      return;
    }
    if (formData.step === 3 && !valueStep3) {
      alert('Please select an Options');
      return;
    }
  if (formData.step === 4 && !formData.business_name.trim()) {
    alert('Please enter a business name');
    return;
  }
  if (formData.step === 5 && !formData.firstName.trim()) {
    alert('Please enter your first name');
    return;
  }
  if (formData.step === 5 && !formData.lastName.trim()) {
    alert('Please enter your last name');
    return;
  }
  if (formData.step === 5 && !formData.email.trim()) {
    alert('Please enter your email');
    return;
  }
  if (formData.step === 5 && !formData.phone_no.trim()) {
    alert('Please enter your phone number');
    return;
  }
    setFormData({ ...formData, step: formData.step + 1 });
  };
  return (
    <LinearGradient
      colors={[
        "rgba(213, 234, 253, 0.8)",
        "rgba(213, 234, 253, 0.8)",
        "rgba(213, 234, 253, 0.3)",
        "rgba(245, 186, 207, 0.1)",
        "rgba(243, 168, 195, 0.1)",
        "rgba(240, 148, 182, 0.1)",
        "rgba(213, 234, 253, 0.8)",
        "rgba(213, 234, 253, 0.8)",
        "rgba(252, 247, 232, 1)",
      ]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView>
        <View style={styles.stepIndicator}>
          {[1, 2, 3, 4, 5].map((stepNumber, index) => (
            <React.Fragment key={stepNumber}>
              <View
                style={[
                  styles.stepCircle,
                  formData.step >= stepNumber && styles.stepCircleActive,
                ]}
              >
                <Text style={styles.stepText}>{stepNumber}</Text>
              </View>
              {index < 4 && (
                <View
                  style={[
                    styles.stepLine,
                    formData.step > stepNumber && styles.stepLineActive,
                  ]}
                />
              )}
            </React.Fragment>
          ))}
        </View>
        {formData.step === 1 && (
          <View className="w-96 items-center">
            <Text className="text-base mb-2 text-left">
              What Best Describes Your Business?
            </Text>
            <DropdownPicker
              open={openStep1}
              value={valueStep1}
              placeholder="Select categories"
              items={[
                {
                  label: "Consulting Real Estate",
                  value: "consulting-real-estate",
                },
                { label: "Consulting", value: "Consulting" },
                { label: "Food & Beverages", value: "Food & Beverages" },
                { label: "Health", value: "Health" },
                {
                  label: "Manufacturing / Wholesale",
                  value: "Manufacturing / Wholesale",
                },
                { label: "Non Profit", value: "Non Profit" },
                { label: "Retail", value: "Retail" },
                {
                  label: "Transportation / Logistics",
                  value: "Transportation / Logistics",
                },
                { label: "Other Services", value: "Other Services" },
              ]}
              onChangeItem={(items) => {
                setValueStep1(items.label);
                setFormData({ ...formData, business_description: items.label }); // Update the formData state
              }}
              setOpen={setOpenStep1}
              setValue={setValueStep1}
              containerStyle={styles.dropdownContainer}
              style={styles.dropdown}
              dropDownStyle={styles.dropdown}
              labelStyle={styles.dropdownLabel}
              itemStyle={{ borderWidth: 0 }}
            />
            <TouchableOpacity
              className="bg-blue-500 px-3 py-3 mt-6 rounded-md"
              onPress={handleNextStep}
            >
              <Text style={styles.buttonText}>Next Step</Text>
            </TouchableOpacity>
          </View>
        )}
        {formData.step === 2 && (
          <View className="w-96 items-center">
            <Text className="text-base text-black mr-28 mb-2 text-left">
              How Large is Your Business?
            </Text>
            <DropdownPicker
              open={openStep2}
              value={valueStep2}
              placeholder="Select an Option"
              items={[
                { label: "Startup (1 - 9 Employees)", value: "Startup (1 - 9 Employees)" },
                { label: "Small (10 - 50 Employees)", value: "Small (10 - 50 Employees)" },
                { label: "Mid-Size (51 - 250 Employees)", value: "Mid-Size (51 - 250 Employees)" },
                {
                  label: "Middle Market (250 - 1000 Employees)",
                  value: "Middle Market (250 - 1000 Employees)",
                },
                { label: "Enterprise (1000+ Employees)", value: "Enterprise (1000+ Employees)" },
              ]}
              setOpen={setOpenStep2}
              setValue={setValueStep2}
              containerStyle={styles.dropdownContainer}
              style={styles.dropdown}
              dropDownStyle={styles.dropdown}
              labelStyle={styles.dropdownLabel}
              onChangeItem={(item) => {
                setValueStep2(item.value);
                setFormData({ ...formData, business_size: item.value });
              }}
              itemStyle={{ borderWidth: 0 }}
            />
            <View className="flex flex-row justify-between mt-5 w-11/12">
              <TouchableOpacity
                className="bg-blue-500 px-5 py-3 rounded-md ml-2"
                onPress={handlePreviousStep}>
                <Text className="text-white text-base font-bold">Back</Text>
              </TouchableOpacity>
              <TouchableOpacity className="ml-20 mr-20"></TouchableOpacity>
              <TouchableOpacity
                className="bg-blue-500 px-3 py-3 rounded-md"
                onPress={handleNextStep}>
                <Text className="text-white font-bold text-base">
                  Next Step
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {formData.step === 3 && (
          <View className="w-96 items-center">
            <Text className="text-base mr-28 mb-3 text-left">
              Select Your Business Category
            </Text>
            <DropdownPicker
              open={openStep3}
              value={valueStep3}
              placeholder="Select categories"
              items={[
                {
                  label: "Accounting & Bookkeeping Service",
                  value: "Accounting & Bookkeeping Service",
                },
                {
                  label: "Financial Planning & Analysis",
                  value: "Financial Planning & Analysis",
                },
                {
                  label: "Business System & Processes",
                  value: "Business System & Processes",
                },
                { label: "Audit & Assurance", value: "Audit & Assurance" },
                { label: "Tax", value: "Tax" },
              ]}
              setOpen={setOpenStep3}
              setValue={setValueStep3}
              containerStyle={styles.dropdownContainer}
              style={styles.dropdown}
              dropDownStyle={styles.dropdown}
              labelStyle={styles.dropdownLabel}
              onChangeItem={(item) => {
                setValueStep3(item.value);
                setFormData({ ...formData, business_category: item.value });
              }}
              itemStyle={{ borderWidth: 0 }}
            />
            <View className="flex flex-row justify-between mt-5 w-11/12">
              <TouchableOpacity
                className="bg-blue-500 px-5 py-3 rounded-md ml-2"
                onPress={handlePreviousStep}
              >
                <Text className="text-white text-base font-bold">Back</Text>
              </TouchableOpacity>
              <TouchableOpacity className="ml-20 mr-20"></TouchableOpacity>
              <TouchableOpacity
                className="bg-blue-500 px-3 py-3 rounded-md"
                onPress={handleNextStep}
              >
                <Text className="text-white font-bold text-base">
                  Next Step
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {formData.step === 4 && (
          <View className="w-96 items-center">
            <Text className="text-base mb-2 mr-52">Business Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Business Name"
              placeholderTextColor="black"
              onChangeText={(value) =>
                handleInputChange(value, "business_name")
              }
            />
            <View className="flex flex-row justify-between w-11/12">
              <TouchableOpacity
                className="bg-blue-500 px-5 py-3 rounded-md ml-2"
                onPress={handlePreviousStep}
              >
                <Text className="text-white text-base font-bold">Back</Text>
              </TouchableOpacity>
              <TouchableOpacity className="ml-20 mr-20"></TouchableOpacity>
              <TouchableOpacity
                className="bg-blue-500 px-3 py-3 rounded-md"
                onPress={handleNextStep}
              >
                <Text className="text-white font-bold text-base">
                  Next Step
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {formData.step === 5 && (
          <View
            style={{
              width: "50%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text className="text-lg text-start">Personal Details</Text>
            <View className="flex flex-row justify-between">
              <TextInput
                style={styles.input}
                placeholder="First Name"
                placeholderTextColor="black"
                onChangeText={(value) => handleInputChange(value, "firstName")}
              />
              <TextInput
                style={styles.input}
                placeholder="Last Name"
                placeholderTextColor="black"
                className="ml-3"
                style={styles.input}
                onChangeText={(value) => handleInputChange(value, "lastName")}
              />
            </View>
            <View className="flex flex-row justify-between">
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="black"
                onChangeText={(value) => handleInputChange(value, "email")}
              />
              <TextInput
                style={styles.input}
                placeholder="Phone No"
                placeholderTextColor="black"
                className="ml-3"
                onChangeText={(value) => handleInputChange(value, "phone_no")}
              />
            </View>
            <View className="flex flex-row justify-between w-11/12">
              <TouchableOpacity
                className="bg-blue-500 px-5 py-3 rounded-md ml-2"
                onPress={handlePreviousStep}
              >
                <Text className="text-white text-base font-bold">Back</Text>
              </TouchableOpacity>
              <TouchableOpacity className="ml-20 mr-20"></TouchableOpacity>
              <TouchableOpacity
                className="bg-blue-500 px-3 py-3 rounded-md"
                onPress={handleSubmit}
              >
                <Text className="text-white font-bold text-base">
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    width: "100%",
  },
  stepIndicator: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    marginBottom: 15,
  },
  stepCircle: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  stepCircleActive: {
    backgroundColor: "#0b7ffe",
  },
  stepText: {
    color: "white",
    fontSize: 16,
  },
  stepContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: "#ccc",
  },
  stepLineActive: {
    backgroundColor: "#0b7ffe",
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  dropdownContainer: {
    width: "90%",
    height: 40,
    marginBottom: 20,
  },
  dropdown: {
    backgroundColor: "#fafafa",
    borderWidth: 0,
    padding: 12,
    height: 65,
    border: 0,
  },
  dropdownList: {
    borderWidth: 0,
    border: "none",
  },
  button: {
    backgroundColor: "blue",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
    input: {
      padding: 14,
      borderRadius: 12,
      marginBottom: 20,
      width: "90%",
      borderWidth: 1,
     borderColor: 'rgba(128, 128, 128, 0.5)',
    }

});
export default MultiStepForm;
