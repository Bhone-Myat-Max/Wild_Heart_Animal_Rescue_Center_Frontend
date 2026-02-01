import Image from "next/image";
import { Input } from "../ui/input";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { FieldError } from "../ui/field";


export type ImageUploadProp = {
    onUpload: Dispatch<SetStateAction<string | undefined>>,
    maxSize: number,
    width: number,
    height: number
}
export default function ImageUpolad({ onUpload , maxSize, width, height}: ImageUploadProp) {
    const [image, setImage] = useState<string>("")
    const [error, setError] = useState<string>("")
    const fileInputRef = useRef<HTMLInputElement>(null)
    const MAX_SIZE = maxSize * 1024 * 1024 

    const handleUploadClick = (e: React.MouseEvent<HTMLDivElement>) => {
        fileInputRef.current?.click()
    }
    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            if (file.size > MAX_SIZE) {
                setError(`File size must be less than ${maxSize} MB.`)
            } else {
                setError('')
                const url = URL.createObjectURL(file)
                setImage(url);
                onUpload(url);
            }

        }
    }

    return <div>
        {
            image ? <Image src={image} alt="as" width={width} height={height} onClick={handleUploadClick} />
                :
                <div onClick={handleUploadClick}>Upload UI here</div>
        }
        <Input ref={fileInputRef} className="hidden" type="file" accept="image/png, image/jpeg, image/jpg" onChange={handleUpload} />
        <FieldError>{error}</FieldError>
    </div>
}