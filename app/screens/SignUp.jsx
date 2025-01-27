import { ScrollView, Text, View, TouchableOpacity, TextInput, Alert } from "react-native";
import React, { useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./login.style";
import LottieView from "lottie-react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants/theme";
import { BackBtn, Button } from "../components";
import axios from "axios";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Required"),
  email: Yup.string()
    .email("Provide a valid email address")
    .required("Required"),
  username: Yup.string()
    .min(3, "Provide a valid username")
    .required("Required"),
});

const SignUp = ({ navigation }) => {
  const animation = useRef(null);
  const [loader, setLoader] = useState(false);
  const [obsecureText, setObsecureText] = useState(false);

  const inValidForm = () => {
    Alert.alert("Invalid Form", "Please provide all required fields", [
      { text: "Cancel", onPress: () => {} },
      { text: "Continue", onPress: () => {} },
    ]);
  };

  const registerUser = async (values) => {
    setLoader(true);

    try {
      const endpoint = "http://192.168.1.194:6002/register"; // Make sure to update if you are using a different API URL
      const data = values;

      const response = await axios.post(endpoint, data);

      if (response.status === 201) {
        setLoader(false);
        Alert.alert("Registration Successful", "Your account has been created", [
          {
            text: "OK",
            onPress: () => navigation.navigate("login"), // Navigate to login page after registration success
          },
        ]);
      } else {
        setLoader(false);
        Alert.alert("Error", "Something went wrong. Try again", [
          { text: "OK", onPress: () => {} },
        ]);
      }
    } catch (error) {
      setLoader(false);
      Alert.alert("Error", "Oops, Error creating your account", [
        { text: "Cancel", onPress: () => {} },
        { text: "Continue", onPress: () => {} },
      ]);
    }
  };

  return (
    <ScrollView style={{ backgroundColor: COLORS.white }}>
      <View style={{ marginHorizontal: 20, marginTop: 50 }}>
        <BackBtn onPress={() => navigation.goBack()} />
        <LottieView
          autoPlay
          ref={animation}
          style={{ width: "100%", height: 300 }}
          source={require("../../assets/anime/delivery.json")}
        />
        <Text style={styles.titleLogin}>Delivery Boy</Text>
        <Formik
          initialValues={{
            email: "",
            password: "",
            username: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => registerUser(values)}
        >
          {({
            handleChange,
            handleBlur,
            touched,
            handleSubmit,
            values,
            errors,
            isValid,
            setFieldTouched,
          }) => (
            <View>
              <View style={styles.wrapper}>
                <Text style={styles.label}>Username</Text>
                <View
                  style={styles.inputWrapper(
                    touched.username ? COLORS.secondary : COLORS.offwhite
                  )}
                >
                  <MaterialCommunityIcons
                    name="face-man-profile"
                    size={20}
                    color={COLORS.gray}
                    style={styles.iconStyle}
                  />
                  <TextInput
                    placeholder="Username"
                    onFocus={() => {
                      setFieldTouched("username");
                    }}
                    onBlur={() => {
                      setFieldTouched("username", "");
                    }}
                    value={values.username}
                    onChangeText={handleChange("username")}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={{ flex: 1 }}
                  />
                </View>
                {touched.username && errors.username && (
                  <Text style={styles.errorMessage}>{errors.username}</Text>
                )}
              </View>

              <View style={styles.wrapper}>
                <Text style={styles.label}>Email</Text>
                <View
                  style={styles.inputWrapper(
                    touched.email ? COLORS.secondary : COLORS.offwhite
                  )}
                >
                  <MaterialCommunityIcons
                    name="email-outline"
                    size={20}
                    color={COLORS.gray}
                    style={styles.iconStyle}
                  />
                  <TextInput
                    placeholder="Enter email"
                    onFocus={() => {
                      setFieldTouched("email");
                    }}
                    onBlur={() => {
                      setFieldTouched("email", "");
                    }}
                    value={values.email}
                    onChangeText={handleChange("email")}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={{ flex: 1 }}
                  />
                </View>
                {touched.email && errors.email && (
                  <Text style={styles.errorMessage}>{errors.email}</Text>
                )}
              </View>

              <View style={styles.wrapper}>
                <Text style={styles.label}>Password</Text>
                <View
                  style={styles.inputWrapper(
                    touched.password ? COLORS.secondary : COLORS.offwhite
                  )}
                >
                  <MaterialCommunityIcons
                    name="lock-outline"
                    size={20}
                    color={COLORS.gray}
                    style={styles.iconStyle}
                  />
                  <TextInput
                    secureTextEntry={obsecureText}
                    placeholder="Password"
                    onFocus={() => {
                      setFieldTouched("password");
                    }}
                    onBlur={() => {
                      setFieldTouched("password", "");
                    }}
                    value={values.password}
                    onChangeText={handleChange("password")}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={{ flex: 1 }}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      setObsecureText(!obsecureText);
                    }}
                  >
                    <MaterialCommunityIcons
                      name={obsecureText ? "eye-outline" : "eye-off-outline"}
                      size={18}
                    />
                  </TouchableOpacity>
                </View>
                {touched.password && errors.password && (
                  <Text style={styles.errorMessage}>{errors.password}</Text>
                )}
              </View>

              <Button
                loader={loader}
                title={"R E G I S T E R"}
                onPress={isValid ? handleSubmit : inValidForm}
                isValid={isValid}
              />
              <Text
                style={styles.registration}
                onPress={() => {
                  navigation.navigate("login");
                }}
              >
                Already have an account? Login Here
              </Text>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default SignUp;
