import { useState, useEffect } from "react";
import { Task, AddTask, AddTaskErros } from "../../utils/Types";
import { validateTaskForm } from "../../utils/Validation";
import {
  Button,
  Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useChatState } from "../../Context/UserContext";

interface EditTaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: AddTask) => void;
  initialTask?: Task;
}

export const EditTaskForm = ({ 
  isOpen, 
  onClose, 
  onSave, 
  initialTask 
}: EditTaskFormProps) => {
  const { user } = useChatState();

  const [formData, setFormData] = useState<AddTask>({
    userId: user?._id || "unknown-user",
    taskName: "",
    description: "",
    isCompleted: false,
  });

  const [errors, setErrors] = useState<AddTaskErros>({});

  // Populate form with initial task data when modal opens
  useEffect(() => {
    if (initialTask && isOpen) {
      setFormData({
        userId: initialTask._id,
        taskName: initialTask.taskName,
        description: initialTask.description,
        isCompleted: initialTask.isCompleted
      });
    }
  }, [initialTask, isOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof AddTask
  ) => {
    setFormData({ ...formData, [field]: e.target.value });
    setErrors({ ...errors, [field]: "" });
  };

  const handleSubmit = () => {
    const { isValid, newErrors } = validateTaskForm(formData);
    setErrors(newErrors);

    if (isValid) {
      onSave(formData);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      placement="center"
      size="lg"
      classNames={{
        backdrop: "bg-gray-900/50 backdrop-blur-sm",
        base: "border-gray-200",
        header: "border-b border-gray-200",
        footer: "border-t border-gray-200",
        closeButton: "hover:bg-gray-100 active:bg-gray-200 rounded-full",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              <h2 className="text-xl font-bold">Edit Task</h2>
            </ModalHeader>
            <ModalBody className="gap-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Task Name</label>
                <Input
                  value={formData.taskName}
                  onChange={(e) => handleInputChange(e, "taskName")}
                  placeholder="Enter Task Name"
                  variant="bordered"
                  isInvalid={!!errors.taskName}
                  errorMessage={errors.taskName}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Input
                  value={formData.description}
                  onChange={(e) => handleInputChange(e, "description")}
                  placeholder="Enter Description"
                  variant="bordered"
                  isInvalid={!!errors.description}
                  errorMessage={errors.description}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    isSelected={formData.isCompleted}
                    onValueChange={(isChecked) =>
                      setFormData((prevState) => ({
                        ...prevState,
                        isCompleted: isChecked,
                      }))
                    }
                  >
                    Task is Completed
                  </Checkbox>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="default" variant="flat" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" onPress={handleSubmit}>
                Update Task
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};