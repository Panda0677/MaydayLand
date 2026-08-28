import Image from "next/image";
import { cn } from "@/lib/utils";
import { getUserByName } from "@/data/users";
import { assetPath } from "@/lib/assetPath";

type UserAvatarProps = {
  name: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
};

export function UserAvatar({ name, className, imageClassName, sizes = "44px" }: UserAvatarProps) {
  const user = getUserByName(name);
  const classes = cn("relative grid aspect-square shrink-0 place-items-center overflow-hidden rounded-full bg-orange-100 text-sm font-black text-brand", className);

  if (user?.avatar) {
    return (
      <div className={classes}>
        <Image
          alt={`${name}头像`}
          className={cn("select-none object-cover", imageClassName)}
          fill
          sizes={sizes}
          src={assetPath(user.avatar)}
        />
      </div>
    );
  }

  return <div className={classes}>{name.slice(0, 1)}</div>;
}
