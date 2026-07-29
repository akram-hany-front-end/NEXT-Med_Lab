"use client";
import { Settings, XCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
type Profile = {
  name: string;
  img: string;
  age: string;
};
const Page = () => {
  const [mode, setMode] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [img, setImg] = useState("/man2.png");
// handle Edit function 

const handleEdit = (e:React.FormEvent<HTMLFormElement>) => {
if(!name || !age || !img) {
    alert("Please Fill All Fields")
    return;
}
    setAge("");
    setName("");
    setImg("");
}

return (
    <div className="">
    {mode === true ? (
        <button onClick={() => setMode(false)}>
        <XCircle />
        </button>
      ) : (
        <button onClick={() => setMode(true)}>
          <Settings />
        </button>
      )}

      <h1>Profile</h1>
      {mode === true ? (
        <form onSubmit={handleEdit}>
          <input type="text" onChange={(e) => setName(e.target.value)} />
          <input type="number" onChange={(e) => setAge(e.target.value)} />
          <input
            type="url"
            onChange={(e) => setImg(e.target.value)}
            src=""
            alt=""
          />
          <button type="button">submit</button>
        </form>
      ) : (
        <div className="">
          <Image src={img} alt="image" width={60} height={60} />
          <span>{name}</span>
          <span>{age}</span>
          <span>male</span>
          <span>Admin</span>
          <span>#1</span>
        </div>
      )}
    </div>
  );
};

export default Page;
