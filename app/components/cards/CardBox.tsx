interface CardBoxProps {
  title: string;
  footer?: string;
  border?: boolean;
}

const CardBox: React.FC<CardBoxProps> = ({ title, footer, border }) => {
  return (
    <div
      className={`
          w-full
          ${border ? "border-2 border-gray-300" : "border-0"}          
          `}
    >
      <div
        className="flex justify-center items-center font-bold border-b-2
          h-10"
      >
        {title}
      </div>
      <div>content</div>
      <div>footer</div>
    </div>
  );
};

export default CardBox;
