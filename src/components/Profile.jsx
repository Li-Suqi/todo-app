import React, { useState } from "react";

const Profile = ({ profile, setProfile }) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // define final image size 200px
        const finalSize = 200;
        canvas.width = finalSize;
        canvas.height = finalSize;

        // find central square
        const minSide = Math.min(img.width, img.height);
        const sx = (img.width - minSide) / 2;
        const sy = (img.height - minSide) / 2;

        // draw
        ctx.drawImage(
          img,
          sx,
          sy,
          minSide,
          minSide,
          0,
          0,
          finalSize,
          finalSize,
        );

        // use this jpeg, scale to 0.7
        const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.7);
        setProfile({ ...profile, avatar: compressedDataUrl });
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-6 pb-0 flex flex-col items-center">
      {/* avatar */}
      <div className="relative group w-15 h-15 mb-4">
        <div className="w-full h-full rounded-full bg-slate-100 overflow-hidden border-2 border-amber-100 group-hover:border-amber-400 transition-all shadow-sm">
          {profile.avatar ? (
            <img
              src={profile.avatar}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-4xl font-bold text-amber-300">
              {profile.nickname[0]}
            </div>
          )}
        </div>
        {/* hover text */}
        <div className="absolute inset-0 bg-amber-400/60 rounded-full flex items-center justify-center text-white text-[10px] text-center px-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          use a new image
        </div>
        {/* update button (hidden) */}
        <input
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </div>

      {/* nickname */}
      <div>
        {isEditingName ? (
          <input
            autoFocus
            className="text-center rounded-2xl font-bold text-slate-800 text-base bg-amber-50 outline-none w-full"
            value={profile.nickname}
            onChange={(e) =>
              setProfile({ ...profile, nickname: e.target.value })
            }
            onBlur={() => setIsEditingName(false)}
            onKeyDown={(e) => e.key === "Enter" && setIsEditingName(false)}
          />
        ) : (
          <h2
            onDoubleClick={() => setIsEditingName(true)}
            className="font-bold text-slate-800 text-base cursor-pointer hover:text-amber-400"
            title="Double click to change"
          >
            {profile.nickname}
          </h2>
        )}
      </div>

      {/* bio */}
      <div>
        {isEditingBio ? (
          <input
            autoFocus
            className="mt-1 text-[14px] rounded-2xl text-start text-slate-600 bg-amber-50 outline-none w-50 pl-2.5 pr-2.5"
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            onBlur={() => setIsEditingBio(false)}
            onKeyDown={(e) => e.key === "Enter" && setIsEditingBio(false)}
          />
        ) : (
          <p
            onDoubleClick={() => setIsEditingBio(true)}
            className="text-[14px] text-slate-400 mt-1 text-center line-clamp-2 px-2"
            title="Double click to change"
          >
            {profile.bio}
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;
