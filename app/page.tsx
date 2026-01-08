import Link from "next/link";

export default function Page() {
  return (
    <div className="">
        <div className="flex">
          <div className="p-5 m-10 text-2xl  w-40 flex justify-center items-center  rounded-sm hover:text-black bg-green-600">
            <Link href="/login">LOGIN</Link>
          </div>
          <div className="p-5 m-10 text-2xl  w-40 flex justify-center items-center rounded-sm hover:text-black bg-yellow-600">
            <Link href="/sign">SIGN IN</Link>
          </div>
        </div>
    </div>
  );
}