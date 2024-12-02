/** @format */

import React, { useEffect, useState } from "react";
import styles from "../../css/modules/chat.module.css";
import EmojiPicker from "emoji-picker-react";
import { attachment_icon, default_user_avatar, emoji_icon } from "../../Assets";
import { IoMdSend } from "react-icons/io";
import { getApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";
import { returnFullName } from "../../utils/utils";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import Progress from "../../Components/Progress";

const MessageBox = ({ selectedDriver, profile }) => {
  const [newMessage, setNewMessage] = useState("");
  const [chatDocument, setDocument] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const chatDocId = `${profile?.data?._id}_${selectedDriver?._id}`;
  const firestoreDB = getFirestore();
  const storage = getStorage();

  const onEmojiClick = (emojiData) => {
    setNewMessage((prev) => prev + emojiData.emoji);
  };

  const driverInfo = {
    id: selectedDriver?._id,
    fullName: returnFullName(selectedDriver),
    email: selectedDriver?.email,
  };
  const corporateInfo = {
    id: profile?.data?._id,
    fullName: returnFullName(profile?.data),
    email: profile?.data?.email,
  };

  const fetchDocumentData = async () => {
    const docRef = doc(db, "chat", chatDocId);
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        setDocument(doc.data());
      } else {
        console.log("No such document!");
        setDocument({});
      }
    });
    return unsubscribe;
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const documentRef = doc(db, "chat", chatDocId);
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();

    try {
      const documentSnapshot = await getDoc(documentRef);
      if (documentSnapshot.exists()) {
        const existingData = documentSnapshot.data();
        const existingMessages = Array.isArray(existingData.messages)
          ? existingData.messages
          : [];
        const updatedReply = [
          ...existingMessages,
          {
            text: newMessage,
            id: profile?.data?._id,
            date: formattedDate,
          },
        ];
        await updateDoc(documentRef, {
          messages: updatedReply,
          corporate: corporateInfo,
          driver: driverInfo,
        });
      } else {
        await setDoc(documentRef, {
          messages: [
            {
              text: newMessage,
              id: profile?.data?._id,
              date: formattedDate,
            },
          ],
          corporate: corporateInfo,
          driver: driverInfo,
        });
      }
      setNewMessage("");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  useEffect(() => {
    if (selectedDriver) {
      let unsubscribe;
      const fetchData = async () => {
        unsubscribe = await fetchDocumentData();
      };

      fetchData();

      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }
  }, [selectedDriver]);

  // uploading attachment
  const handleFileUpload = async (file) => {
    if (!file) return;
    setIsUploading(true);

    const storageRef = ref(storage, `attachments/${chatDocId}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
        setProgress(progress?.toFixed(2));
      },
      (error) => {
        console.error("Upload failed: ", error);
      },
      async () => {
        const downloadURL = await getDownloadURL(storageRef);
        const documentRef = doc(firestoreDB, "chat", chatDocId);
        const currentDate = new Date().toISOString();
        try {
          const documentSnapshot = await getDoc(documentRef);
          const attachmentMessage = {
            id: profile?.data?._id,
            date: currentDate,
            attachment: {
              url: downloadURL,
              name: file.name,
              type: file.type,
            },
          };

          if (documentSnapshot.exists()) {
            const existingData = documentSnapshot.data();
            const updatedMessages = [
              ...existingData.messages,
              attachmentMessage,
            ];
            await updateDoc(documentRef, { messages: updatedMessages });
          } else {
            await setDoc(documentRef, { messages: [attachmentMessage] });
          }

          console.log("Attachment added successfully!");
        } catch (error) {
          console.error("Error updating document with attachment: ", error);
        } finally {
          setTimeout(() => {
            setIsUploading(false);
          }, [500]);
        }
      }
    );
  };

  return (
    <div className={styles.remaining_content}>
      <div className={styles.chat_us}>
        <div className={styles.head}>
          <div className={styles.info}>
            <img
              src={default_user_avatar}
              alt=""
              className={styles.thumbnail}
            />
            <p className={styles.title}> {returnFullName(selectedDriver)} </p>
          </div>
        </div>

        {chatDocument?.messages?.length > 0 ? (
          <div className={styles.flex_item}>
            {chatDocument?.messages?.map((item, index) => (
              <div
                className={`${styles.item} ${
                  item?.id === profile?.data?._id
                    ? styles.reciver
                    : styles.sender
                }`}
                key={`chat${index}`}
              >
                {item?.attachment ? (
                  <>
                    {item.attachment.type.startsWith("image/") && (
                      <img
                        className={styles.img_thumbnail}
                        src={item.attachment.url}
                        alt={item.attachment.name}
                      />
                    )}
                    {item.attachment.type.startsWith("video/") && (
                      <video controls className={styles.img_thumbnail}>
                        <source
                          src={item.attachment.url}
                          type={item.attachment.type}
                        />
                        Your browser does not support the video tag.
                      </video>
                    )}
                    {item.attachment.type.startsWith("audio/") && (
                      <audio controls className={styles.img_thumbnail}>
                        <source
                          src={item?.attachment?.url}
                          type={item?.attachment?.type}
                        />
                        Your browser does not support the audio tag.
                      </audio>
                    )}

                    {item.attachment.type === "application/pdf" && (
                      <a
                        href={item.attachment.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.pdf_viewer}
                      >
                        {item.attachment.name}
                      </a>
                    )}
                  </>
                ) : (
                  item?.text
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.not_found}>
            <p>No Previous Chat Found !</p>
          </div>
        )}

        <form
          className={styles.message_container}
          onSubmit={handleOnSubmit}
          onMouseLeave={() => setShowEmojiPicker(false)}
        >
          <img
            src={attachment_icon}
            alt=""
            className={styles.icon}
            onClick={() => document.getElementById("fileInput").click()}
          />
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => handleFileUpload(e.target.files[0])}
          />
          <img
            src={emoji_icon}
            alt=""
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            className={styles.icon}
          />
          {showEmojiPicker && (
            <EmojiPicker onEmojiClick={onEmojiClick} className="emoji-picker" />
          )}

          <input
            type="text"
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
            placeholder="Type your massage..."
          />

          <button className={styles.send_btn} type="submit">
            <IoMdSend />
          </button>
        </form>

        {isUploading && <Progress percentage={progress} />}
      </div>
    </div>
  );
};

const Chat = () => {
  const [drivers, setDrivers] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [profile, setProfile] = useState(null);

  const fetchDrivers = () => {
    getApi(endPoints.drivers.getAllDrivers({ limit: 1000 }), {
      setResponse: setDrivers,
    });
  };

  const fetchProfile = () => {
    getApi(endPoints.auth.getProfile, {
      setResponse: setProfile,
    });
  };

  useEffect(() => {
    fetchProfile();
    fetchDrivers();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.chat_menu}>
        <ul>
          {drivers?.data?.docs?.map((item, index) => (
            <li
              key={`driver${index}`}
              onClick={() => setSelectedDriver(item)}
              className={selectedDriver === item ? styles.active : ""}
            >
              <img src={default_user_avatar} alt="" />
              <p> {returnFullName(item)} </p>
            </li>
          ))}
        </ul>
      </div>

      {selectedDriver && (
        <MessageBox selectedDriver={selectedDriver} profile={profile} />
      )}
    </div>
  );
};

export default Chat;
