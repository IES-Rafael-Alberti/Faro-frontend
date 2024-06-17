import Image from 'next/image'
import React, { useContext, useRef, useState } from 'react'
import './image.css'
import { BasicUserInfoInterface } from '@/types/BasicUserInfo.interface'
import { submitAvatar } from '@/utils/submitData'
import { AuthContext } from '@/app/context/auth'

interface ImageInputProps {
  setBasicUserInfo:any,
  styles: any
}

const ImageInput = ({ styles, setBasicUserInfo }: ImageInputProps) => {
  const {id, token} = useContext(AuthContext)
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadBtnRef = useRef<HTMLButtonElement>(null);

  const handleMouseEnter = () => {
    if (uploadBtnRef.current) {
      uploadBtnRef.current.style.display = 'block';
    }
  };

  const handleMouseLeave = () => {
    if (uploadBtnRef.current) {
      uploadBtnRef.current.style.display = 'none';
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const choosedFile = event.target.files?.[0];

    if (choosedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(choosedFile);
      setBasicUserInfo((prevUserInfo: BasicUserInfoInterface) => ({
        ...prevUserInfo,
        profile_picture: choosedFile
      }))
      console.log(choosedFile);
      
      submitAvatar(choosedFile, id, token)
    }
  };
  return (

    <div
      className={styles.imageUploadContainer}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        src={typeof imageSrc === 'string' ? imageSrc : '/imgs/no-user-image.jpg'}
        className={styles.userImg}
        alt="Profile"
        width={100}
        height={100}
      />
      <input
        id="file"
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <button
        id="uploadBtn"
        ref={uploadBtnRef}
        onClick={() => fileInputRef.current?.click()}
      >
        Upload
      </button>
    </div>
  )
}

export default ImageInput