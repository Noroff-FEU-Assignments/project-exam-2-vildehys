import { useState } from "react";
import { useParams } from "react-router-dom";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { CameraIcon } from "@heroicons/react/24/outline";
import UpdateBanner from "./UpdateBanner";
import UpdateAvatar from "./UpdateAvatar";
import SettingsModal from "../../../layout/SettingsModal";

export default function Settings() {
  const [modalShowBanner, setModalShowBanner] = useState(false);
  const [modalShowAvatar, setModalShowAvatar] = useState(false);

  let { name } = useParams();
  return (
    <>
      <div className="d-flex justify-content-center gap-4 text-center settings">
        <PencilSquareIcon
          onClick={() => setModalShowBanner(true)}
          className="icon icon-settings"
        />
        <SettingsModal
          show={modalShowBanner}
          onHide={() => setModalShowBanner(false)}
          heading="Update banner"
        >
          <UpdateBanner name={name} />
        </SettingsModal>
        <CameraIcon
          onClick={() => setModalShowAvatar(true)}
          className="icon icon-camera"
        />
        <SettingsModal
          show={modalShowAvatar}
          onHide={() => setModalShowAvatar(false)}
          heading="Update avatar"
        >
          <UpdateAvatar name={name} />
        </SettingsModal>
      </div>
    </>
  );
}
