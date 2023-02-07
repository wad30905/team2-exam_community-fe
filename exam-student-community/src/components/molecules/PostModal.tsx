import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { postOptionState } from "../../store/atoms";

import { PostMenuBar, PostMenuBtn } from "./atoms/styled";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const PostModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [state, setState] = useRecoilState(postOptionState)
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const modal = event.target as HTMLElement;
      if (modal.className === "modal-overlay") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClick);
    }

    return () => {
      isOpen && setState(false);
      document.removeEventListener("click", handleClick);
    };
  }, [isOpen, onClose]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("클립보드에 복사 되었습니다.");
    } catch (err) {
      console.error("Failed to copy URL to clipboard: ", err);
      alert("일시적인 네트워크 오류로 인한 복사 실패입니다. 죄송합니다.");
    }
  };

  return (
    <div>
      {isOpen && (
        <div className="modal-overlay">
          <PostMenuBar className="modal-content">
            <PostMenuBtn onClick={handleCopy}>URL 복사</PostMenuBtn>
          </PostMenuBar>
        </div>
      )}
    </div>
  );
};

export default PostModal;
