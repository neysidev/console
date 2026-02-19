import Image from "next/image";

type TeamMemberProps = {
  name: string;
  email: string;
  avatar: string;
};

export function TeamMember({ name, email, avatar }: TeamMemberProps) {
  return (
    <li className="flex items-center gap-4 px-4 py-3 first:rounded-t-xl last:rounded-b-xl">
      <Image
        src={avatar}
        alt=""
        width={40}
        height={40}
        className="size-10 rounded-full bg-gray-100 object-cover"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-primary">{name}</p>
        <p className="truncate text-sm text-gray-700">{email}</p>
      </div>
    </li>
  );
}
