import { IconType } from "react-icons";

interface MenuBoxIconsProps {
  icon: IconType;
  label: String;
  selected?: boolean;
  onClick: () => void;
}

const MenuBoxIcons: React.FC<MenuBoxIconsProps> = ({
  icon: Icon,
  label,
  selected,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`
          flex 
          flex-col 
          items-center 
          justify-center 
          gap-2
          p-3
          border-b-2
          bg-gray-200
          rounded-lg
          hover:bg-sky-200
          hover:text-neutral-800
          transition
          cursor-pointer
          ${selected ? "border-b-neutral-800" : "border-transparent"}
          ${selected ? "text-neutral-800" : "text-neutral-500"}
          `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default MenuBoxIcons;
