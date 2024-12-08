export const WelcomeBanner = () => {
  return (
    <div className="w-full md:w-1/2 bg-primary p-8 flex flex-col justify-center items-center text-white">
      <img
        src="https://cdn.pixabay.com/photo/2022/07/01/15/27/email-7295808_960_720.png" 
        alt="Welcome to EventHive"
        className="w-64 h-64 object-cover mb-6 rounded-xl"
      />
      <h2 className="text-2xl font-bold mb-4">Welcome to TaskMate!</h2>
      <p className="text-center text-zinc-100">
        Join our vibrant community and discover exciting TaskMate near you.
      </p>
    </div>
  );
};
