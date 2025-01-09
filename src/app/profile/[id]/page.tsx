export default function UserProfile({params}:any) {
  return (
    <div className="flex flex-col font-sans items-center justify-center min-h-screen py-2">
      <h1 className="font-bold text-xl">Profile</h1>
      <br />
      <p>
        User ID: <span className="p-2 text-black bg-orange-600 rounded">{params.id}</span>
      </p>
    </div>
  );
}
