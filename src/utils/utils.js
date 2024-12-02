/** @format */
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase/firebase";

const tokenSaver = (res) => {
  localStorage.setItem("token", res);
};

const dateFormatter = (date) => {
  const originalDate = new Date(date);
  const month = originalDate?.toLocaleDateString("en-US", {
    month: "long",
  });
  const day = originalDate?.toLocaleDateString("en-US", {
    month: "numeric",
  });
  const year = originalDate?.toLocaleDateString("en-US", {
    year: "numeric",
  });
  const time = originalDate?.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const hasAll = day && year && time;

  return (
    hasAll && (
      <span>
        {" "}
        {month?.slice(0, 3)} {day}, {year} {time}{" "}
      </span>
    )
  );
};

const returnFullName = (i) => {
  if (i?.fullName) {
    return i.fullName;
  } else if (i?.firstName || i?.lastName) {
    return i?.firstName + " " + i.lastName;
  } else {
    return "";
  }
};

const LogOutHandler = (navigate) => {
  localStorage.clear();
  firebaseSignOut();
  navigate("/");
};

const debouncedSetQuery = (term, setQuery) => {
  clearTimeout(debouncedSetQuery.timeoutId);
  debouncedSetQuery.timeoutId = setTimeout(() => {
    setQuery(term);
  }, 500);
};

const SignInWithFirebase = ({ payload }) => {
  const { email, password } = payload;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(userCredential.user);
    })
    .catch((error) => {
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/invalid-credential" ||
        error.code === "auth/invalid-login-credentials"
      ) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            console.log(userCredential.user);
          })
          .catch((error) => {
            console.error("Error creating account:", error);
          });
      } else {
        console.error("Error signing in:", error);
      }
    });
};

const firebaseSignOut = async () => {
  try {
    await auth.signOut();
  } catch (e) {
    console.log(e);
  }
};

function convertSecondsToTimeFormat(seconds) {
  if (isNaN(seconds) || seconds < 0) {
    return "00:00:00";
  }

  const hours = Math.floor(seconds / 3600);
  const remainingMinutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedTime =
    String(hours).padStart(2, "0") +
    ":" +
    String(remainingMinutes).padStart(2, "0") +
    ":" +
    String(remainingSeconds).padStart(2, "0");

  return formattedTime;
}

const convertSecondsToHHMM = (seconds) => {
  const totalMinutes = Math.floor(seconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}`;
};

const downloadReport = (handlePrint) => {
  var elements = document.getElementsByClassName("hidePrint");
  Array.from(elements).forEach((el) => {
    el.style.setProperty("display", "none", "important");
  });

  requestAnimationFrame(() => {
    handlePrint();
    setTimeout(() => {
      Array.from(elements).forEach((el) => {
        el.style.removeProperty("display");
      });
    }, 500); // Reduce delay time for a smoother user experience
  });
};

export {
  tokenSaver,
  dateFormatter,
  returnFullName,
  LogOutHandler,
  debouncedSetQuery,
  SignInWithFirebase,
  firebaseSignOut,
  convertSecondsToTimeFormat,
  convertSecondsToHHMM,
  downloadReport
};
