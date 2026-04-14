import Image from "next/image";

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  bio?: string;
}

export default function TeamMember({ name, role, image, bio }: TeamMemberProps) {
  return (
    <div className="group text-center">
      <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden shadow-lg ring-4 ring-white group-hover:ring-rose-light transition-all duration-300">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="192px"
        />
      </div>
      <h3 className="text-xl font-bold text-charcoal mt-4">{name}</h3>
      <p className="text-rose-primary font-medium text-sm">{role}</p>
      {bio && (
        <p className="text-charcoal-light text-sm mt-2 max-w-xs mx-auto leading-relaxed">
          {bio}
        </p>
      )}
    </div>
  );
}
