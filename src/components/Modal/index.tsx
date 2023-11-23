import Button from "../Button";
import "./modal.css";

interface ModalProps {
  title: string;
  children: React.ReactNode;
  render: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  submitting: boolean;
}

const Modal: React.FC<ModalProps> = ({
  title,
  children,
  render,
  onCancel,
  onConfirm,
  submitting,
}) => {
  return (
    <>
      {render && (
        <div className="modal-overlay">
          <div className="modal-card-wrapper">
            <div className="modal-card-content">
              <div className="flex justify-between">
                <p className="text-xl font-bold">{title}</p>
                <i
                  className="fas fa-times text-xl text-red-500
          cursor-pointer"
                  onClick={onCancel}
                />
              </div>
              <div className="py-4">{children}</div>
              <div className="flex gap-2 self-end absolute bottom-0">
                <Button
                  title="Cancel"
                  variant="secondary"
                  icon="fas fa-times"
                  onClick={onCancel}
                />
                <Button
                  title="Confirm"
                  icon="fas fa-check"
                  onClick={onConfirm}
                  submitting={submitting}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
