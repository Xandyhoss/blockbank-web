import "./loading.css";

const Loading: React.FC = () => {
  return (
    <div className="w-full justify-center flex gap-1">
      <div className="flex flex-col gap-1 w-10  h-10 relative">
        <div className="square1 w-4 h-4 bg-dukeBlue-800" />
      </div>
    </div>
  );
};

export default Loading;
