import { useState } from "react";
import { AddTask, AddTaskErros } from "../../utils/Types";
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

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: AddTask) => void;
}

export const TaskForm = ({ isOpen, onClose, onSave }: TaskFormProps) => {


  const [fromData, setFormData] = useState<any>({
    taskName: "",
    description: "",
    isCompleted: false,
  });
  const [errors, setErrors] = useState<AddTaskErros>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof AddTask
  ) => {
    setFormData({ ...fromData, [field]: e.target.value });
    setErrors({ ...errors, [field]: "" });
  };

  const handleSubmit = () => {
    const { isValid, newErrors } = validateTaskForm(fromData);
    setErrors(newErrors);

    if (isValid) {
      onSave(fromData);
      setFormData({
        taskName: "",
        description: "",
        isCompleted: false,
      });
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
              <h2 className="text-xl font-bold">Add New Task</h2>
            </ModalHeader>
            <ModalBody className="gap-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Task Name</label>
                <Input
                  value={fromData.taskName}
                  onChange={(e) => handleInputChange(e, "taskName")}
                  placeholder="Enter TaskName"
                  variant="bordered"
                  isInvalid={!!errors.taskName}
                  errorMessage={errors.taskName}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Input
                  value={fromData.description}
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
                    isSelected={fromData.isCompleted}
                    onValueChange={(isChecked) =>
                      setFormData((prevState: any) => ({
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
                Add Task
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
