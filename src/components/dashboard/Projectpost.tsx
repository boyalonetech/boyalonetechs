"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Plus,
  Trash2,
  Image as ImageIcon,
  Upload,
  X,
  AlertTriangle,
  Pin,
  GripVertical,
} from "lucide-react";
import Image from "next/image";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DraggableAttributes,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import toast from "react-hot-toast";
import { CheckCircle, AlertCircle, Info } from "lucide-react";

// Custom Toast Components
const CustomToast = {
  success: (message: string) => {
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-green-50 border-l-4 border-green-500 shadow-xl rounded-lg pointer-events-auto flex items-start p-4`}
        >
          <div className="flex items-start gap-3 flex-1">
            <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
            <div className="flex-1">
              <div className="font-semibold text-green-800 mb-1">Success</div>
              <div className="text-sm text-gray-600">{message}</div>
            </div>
          </div>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="text-gray-400 hover:text-gray-600 ml-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      ),
      { duration: 3000, position: "top-right" }
    );
  },

  error: (message: string) => {
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-red-50 border-l-4 border-red-500 shadow-xl rounded-lg pointer-events-auto flex items-start p-4`}
        >
          <div className="flex items-start gap-3 flex-1">
            <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
            <div className="flex-1">
              <div className="font-semibold text-red-800 mb-1">Error</div>
              <div className="text-sm text-gray-600">{message}</div>
            </div>
          </div>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="text-gray-400 hover:text-gray-600 ml-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      ),
      { duration: 4000, position: "top-right" }
    );
  },

  info: (message: string) => {
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-blue-50 border-l-4 border-blue-500 shadow-xl rounded-lg pointer-events-auto flex items-start p-4`}
        >
          <div className="flex items-start gap-3 flex-1">
            <Info className="w-6 h-6 text-blue-500 flex-shrink-0" />
            <div className="flex-1">
              <div className="font-semibold text-blue-800 mb-1">Info</div>
              <div className="text-sm text-gray-600">{message}</div>
            </div>
          </div>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="text-gray-400 hover:text-gray-600 ml-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      ),
      { duration: 3000, position: "top-right" }
    );
  },

  warning: (message: string) => {
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-yellow-50 border-l-4 border-yellow-500 shadow-xl rounded-lg pointer-events-auto flex items-start p-4`}
        >
          <div className="flex items-start gap-3 flex-1">
            <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0" />
            <div className="flex-1">
              <div className="font-semibold text-yellow-800 mb-1">Warning</div>
              <div className="text-sm text-gray-600">{message}</div>
            </div>
          </div>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="text-gray-400 hover:text-gray-600 ml-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      ),
      { duration: 4000, position: "top-right" }
    );
  },
};

interface Project {
  id: string;
  title: string;
  description: string;
  demoLink: string;
  image?: string;
  pinned: boolean;
  createdAt: string;
  position: number;
}

// Sortable Project Card Component
interface SortableProjectCardProps extends ProjectCardProps {
  id: string;
}

const SortableProjectCard = ({ id, ...props }: SortableProjectCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <ProjectCard
        {...props}
        isDragging={isDragging}
        attributes={attributes}
        listeners={listeners}
      />
    </div>
  );
};

// Original Project Card Component
interface ProjectCardProps {
  project: Project;
  onDelete: (id: string, title: string, e: React.MouseEvent) => void;
  onTogglePin: (id: string, currentlyPinned: boolean) => void;
  onEdit: (project: Project) => void;
  onSaveEdit: (projectId: string) => void;
  onCancelEdit: () => void;
  editingId: string | null;
  editFormData: {
    title: string;
    description: string;
    demoLink: string;
    pinned: boolean;
  };
  onEditInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onEditImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  editImagePreview: string | null;
  onRemoveEditImage: () => void;
  pinningId: string | null;
  deletingId: string | null;
  editing: boolean;
  isDragging?: boolean;
  attributes?: DraggableAttributes;
  listeners?: SyntheticListenerMap;
}

const ProjectCard = ({
  project,
  onDelete,
  onTogglePin,
  onEdit,
  onSaveEdit,
  onCancelEdit,
  editingId,
  editFormData,
  onEditInputChange,
  onEditImageSelect,
  editImagePreview,
  onRemoveEditImage,
  pinningId,
  deletingId,
  editing,
  isDragging = false,
  attributes,
  listeners,
}: ProjectCardProps) => {
  const isEditing = editingId === project.id;

  if (isEditing) {
    return (
      <div className="bg-white rounded-xl shadow p-4 border-l-4 border-blue-500">
        {/* Edit Image Upload */}
        <div className="mb-4">
          {editImagePreview ? (
            <div className="relative mb-3">
              <Image
                src={editImagePreview}
                alt="Preview"
                width={400}
                loading="lazy"
                height={200}
                className="w-full h-48 object-cover rounded-lg border"
              />
              <button
                type="button"
                onClick={onRemoveEditImage}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors cursor-pointer mb-3"
              onClick={() =>
                document
                  .getElementById(`editImageUpload-${project.id}`)
                  ?.click()
              }
            >
              <Upload className="mx-auto h-6 w-6 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600">Click to change image</p>
              <p className="text-xs text-gray-500 mt-1">
                Current: {project.image ? "Has image" : "No image"}
              </p>
            </div>
          )}
          <input
            id={`editImageUpload-${project.id}`}
            type="file"
            accept="image/*"
            onChange={onEditImageSelect}
            className="hidden"
          />
        </div>

        {/* Edit Form */}
        <div className="space-y-3">
          <input
            type="text"
            name="title"
            value={editFormData.title}
            onChange={onEditInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Project title"
            disabled={editing}
          />
          <textarea
            name="description"
            value={editFormData.description}
            onChange={onEditInputChange}
            rows={3}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Project description"
            disabled={editing}
          />
          <input
            type="url"
            name="demoLink"
            value={editFormData.demoLink}
            onChange={onEditInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Demo link"
            disabled={editing}
          />
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={`edit-pinned-${project.id}`}
              name="pinned"
              checked={editFormData.pinned}
              onChange={onEditInputChange}
              className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
              disabled={editing}
            />
            <label 
              htmlFor={`edit-pinned-${project.id}`}
              className="text-sm font-medium text-gray-700"
            >
              Pin project {editFormData.pinned && "(Max 6 projects can be pinned)"}
            </label>
          </div>
        </div>

        {/* Edit Actions */}
        <div className="flex space-x-2 mt-4">
          <button
            onClick={() => onSaveEdit(project.id)}
            disabled={editing}
            className="flex-1 bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 flex items-center justify-center space-x-1"
          >
            {editing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <span>Save Changes</span>
              </>
            )}
          </button>
          <button
            onClick={onCancelEdit}
            disabled={editing}
            className="flex-1 bg-gray-500 text-white px-3 py-2 rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white rounded-xl shadow p-4 border-l-4 border-blue-500 hover:shadow-md transition-shadow relative ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      {/* Project Image */}
      {project.image ? (
        <div className="relative w-full h-48 mb-4">
          <Image
            src={project.image}
            alt={project.title}
            fill
            loading="lazy"
            className="object-cover rounded-lg"
          />
        </div>
      ) : (
        <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
          <ImageIcon className="text-gray-400" size={48} />
        </div>
      )}

      {/* Project Content */}
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg text-gray-900">
            {project.title}
          </h3>
          <div className="flex space-x-1">
            {/* Drag Handle */}
            {listeners && attributes && (
              <button
                {...attributes}
                {...listeners}
                className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors cursor-grab active:cursor-grabbing"
                title="Drag to reorder"
              >
                <GripVertical size={16} />
              </button>
            )}

            {/* Pin Button */}
            <button
              onClick={() => onTogglePin(project.id, project.pinned)}
              disabled={pinningId === project.id}
              className={`p-2 rounded-full transition-colors ${
                project.pinned
                  ? "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              title={project.pinned ? "Unpin project" : "Pin project"}
            >
              {pinningId === project.id ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
              ) : (
                <Pin
                  size={16}
                  fill={project.pinned ? "currentColor" : "none"}
                />
              )}
            </button>

            {/* Edit Button */}
            <button
              onClick={() => onEdit(project)}
              className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
              title="Edit project"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
              </svg>
            </button>

            {/* Delete Button */}
            <button
              onClick={(e) => onDelete(project.id, project.title, e)}
              disabled={deletingId === project.id}
              className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors disabled:opacity-50"
              title="Delete project"
            >
              {deletingId === project.id ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
              ) : (
                <Trash2 size={16} />
              )}
            </button>
          </div>
        </div>

        <p className="text-gray-600 text-sm line-clamp-3">
          {project.description}
        </p>

        {project.demoLink && (
          <a
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1 text-blue-500 hover:text-blue-600 transition-colors text-sm"
          >
            <span>View Demo</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        )}

        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>
            Created: {new Date(project.createdAt).toLocaleDateString()}
          </span>
          {project.pinned && (
            <span className="flex items-center space-x-1 text-yellow-600">
              <Pin size={12} fill="currentColor" />
              <span>Pinned</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    demoLink: "",
    pinned: false,
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Drag and drop state
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [updatingPositions, setUpdatingPositions] = useState(false);

  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    description: "",
    demoLink: "",
    pinned: false,
  });
  const [editSelectedImage, setEditSelectedImage] = useState<File | null>(null);
  const [editImagePreview, setEditImagePreview] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);

  // Delete popup state
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Pinning state
  const [pinningId, setPinningId] = useState<string | null>(null);

  // Configure sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Add custom animation styles
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes enter {
        from {
          transform: translateX(400px);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      @keyframes leave {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(400px);
          opacity: 0;
        }
      }
      .animate-enter {
        animation: enter 0.3s ease-out;
      }
      .animate-leave {
        animation: leave 0.2s ease-in;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Fetch projects from Supabase
  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      console.log("Fetching projects...");

      const res = await fetch("/api/projects");

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log("Projects fetched:", data);

      if (data.success) {
        // Sort projects by position
        const sortedProjects = data.projects.sort(
          (a: Project, b: Project) => a.position - b.position
        );
        console.log("Sorted projects:", sortedProjects);
        setProjects(sortedProjects);
      } else {
        console.error("Error fetching projects:", data.error);
        CustomToast.error(`Error fetching projects: ${data.error}`);
      }
    } catch (err: unknown) {
      console.error("Error fetching projects:", err);
      CustomToast.error(
        `Error fetching projects: ${
          err instanceof Error ? err.message : String(err)
        }`
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Handle drag start
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
    setIsDragging(true);
  };

  // Handle drag end
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setIsDragging(false);
    setActiveId(null);

    if (!over || active.id === over.id) return;

    setUpdatingPositions(true);
    try {
      // Get the dragged project
      const draggedProject = projects.find((p) => p.id === active.id);
      const targetProject = projects.find((p) => p.id === over.id);

      if (!draggedProject || !targetProject) return;

      // Check if we're trying to drag between pinned and unpinned sections
      if (draggedProject.pinned !== targetProject.pinned) {
        CustomToast.warning(
          `Cannot move ${
            draggedProject.pinned ? "pinned" : "unpinned"
          } project to ${
            targetProject.pinned ? "pinned" : "unpinned"
          } section. Please use the pin/unpin button instead.`
        );
        return;
      }

      // Reorder within the same section
      const oldIndex = projects.findIndex((item) => item.id === active.id);
      const newIndex = projects.findIndex((item) => item.id === over.id);

      const newProjects = arrayMove(projects, oldIndex, newIndex);

      // Update positions for all projects (0-based index)
      const updatedProjects = newProjects.map((item, index) => ({
        ...item,
        position: index,
      }));

      setProjects(updatedProjects);

      // Then save to database
      await updatePositions(updatedProjects);
    } catch (error: unknown) {
      console.error("Error during drag:", error);
      CustomToast.error(
        `Error saving positions: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
      // Revert on error
      fetchProjects();
    } finally {
      setUpdatingPositions(false);
    }
  };

  // Update positions in the database
  const updatePositions = async (updatedProjects: Project[]) => {
    try {
      console.log("Updating positions:", updatedProjects);

      const response = await fetch("/api/projects/positions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projects: updatedProjects.map((project) => ({
            id: project.id,
            position: project.position,
            pinned: project.pinned,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Positions update response:", data);

      if (!data.success) {
        throw new Error(data.error || "Failed to update positions");
      }

      CustomToast.success("Project positions updated successfully!");
      return data;
    } catch (error: unknown) {
      console.error("Error updating positions:", error);
      throw error;
    }
  };

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Handle edit form input changes
  const handleEditInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setEditFormData({
        ...editFormData,
        [name]: checked,
      });
    } else {
      setEditFormData({
        ...editFormData,
        [name]: value,
      });
    }
  };

  // Handle image selection for add form
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        CustomToast.error("Please select an image file (JPEG, PNG, GIF, etc.)");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        CustomToast.error("Please select an image smaller than 5MB");
        return;
      }

      setSelectedImage(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image selection for edit form
  const handleEditImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        CustomToast.error("Please select an image file (JPEG, PNG, GIF, etc.)");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        CustomToast.error("Please select an image smaller than 5MB");
        return;
      }

      setEditSelectedImage(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        setEditImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove selected image from add form
  const removeSelectedImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    const fileInput = document.getElementById(
      "imageUpload"
    ) as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  // Remove selected image from edit form
  const removeEditSelectedImage = () => {
    setEditSelectedImage(null);
    setEditImagePreview(null);
    const fileInput = document.getElementById(
      `editImageUpload-${editingId}`
    ) as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const uploadImageToStorage = async (file: File): Promise<string> => {
    console.log("Uploading image:", file.name, file.size, file.type);
    
    const formData = new FormData();
    formData.append("file", file);

    try {
      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      console.log("Upload response status:", uploadResponse.status);
      
      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        console.error("Upload error response:", errorText);
        throw new Error(`Upload failed with status: ${uploadResponse.status}, response: ${errorText}`);
      }

      const uploadData = await uploadResponse.json();
      console.log("Upload response data:", uploadData);

      if (!uploadData.success) {
        throw new Error(uploadData.error || "Upload failed");
      }

      console.log("Upload successful, public URL:", uploadData.publicUrl);
      return uploadData.publicUrl;
    } catch (error) {
      console.error("Error in uploadImageToStorage:", error);
      throw error;
    }
  };

  // Handle form submission for adding new project
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setUploadProgress(0);

    try {
      let imageUrl = "";

      if (selectedImage) {
        setUploadProgress(50);
        imageUrl = await uploadImageToStorage(selectedImage);
        setUploadProgress(100);
      }

      // Check if we're trying to pin more than 6 projects
      if (formData.pinned) {
        const pinnedCount = projects.filter((p) => p.pinned).length;
        if (pinnedCount >= 6) {
          CustomToast.warning(
            "Maximum of 6 projects can be pinned. Please unpin some projects first."
          );
          return;
        }
      }

      // Get current max position to place new project at the end
      const maxPosition =
        projects.length > 0 ? Math.max(...projects.map((p) => p.position)) : -1;

      const res = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          demoLink: formData.demoLink,
          imageUrl: imageUrl,
          pinned: formData.pinned,
          position: maxPosition + 1,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      if (data.success) {
        // Refresh projects to get the new order
        await fetchProjects();
        setFormData({
          title: "",
          description: "",
          demoLink: "",
          pinned: false,
        });
        setSelectedImage(null);
        setImagePreview(null);
        setShowForm(false);
        setUploadProgress(0);
        CustomToast.success("Project added successfully!");
      } else {
        CustomToast.error(`Error creating project: ${data.error}`);
      }
    } catch (err: unknown) {
      console.error("Error creating project:", err);
      CustomToast.error(
        `Error creating project: ${
          err instanceof Error ? err.message : String(err)
        }`
      );
    } finally {
      setSubmitting(false);
      setUploadProgress(0);
    }
  };

  // Start editing a project
  const startEditing = (project: Project) => {
    console.log("Starting to edit project:", project);
    setEditingId(project.id);
    setEditFormData({
      title: project.title,
      description: project.description,
      demoLink: project.demoLink,
      pinned: project.pinned,
    });
    setEditImagePreview(project.image || null);
    setEditSelectedImage(null);
    console.log("Edit form data set:", {
      title: project.title,
      description: project.description,
      demoLink: project.demoLink,
      pinned: project.pinned,
      imagePreview: project.image || null,
    });
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingId(null);
    setEditFormData({
      title: "",
      description: "",
      demoLink: "",
      pinned: false,
    });
    setEditImagePreview(null);
    setEditSelectedImage(null);
  };

  // Handle form submission for editing project - FIXED VERSION
  const handleEditSubmit = async (projectId: string) => {
    console.log("=== EDIT SUBMIT STARTED ===");
    console.log("Project ID:", projectId);
    console.log("Edit Form Data:", editFormData);
    console.log("Edit Image Preview:", editImagePreview ? "Exists" : "None");
    console.log("Edit Selected Image:", editSelectedImage ? "New file" : "None");
    
    setEditing(true);

    try {
      let imageUrl: string | null | undefined = undefined;

      // Handle image logic
      if (editSelectedImage) {
        console.log("New image selected, uploading...");
        imageUrl = await uploadImageToStorage(editSelectedImage);
        console.log("Uploaded image URL:", imageUrl);
      } else if (editImagePreview === null) {
        console.log("Image removed by user");
        const currentProject = projects.find(p => p.id === projectId);
        if (currentProject?.image) {
          console.log("Removing existing image");
          imageUrl = null;
        }
      } else {
        console.log("Keeping existing image");
        // Don't change imageUrl - leave it undefined so API doesn't update image
      }

      // Check pin limit
      const currentProject = projects.find((p) => p.id === projectId);
      console.log("Current project:", currentProject);
      
      if (editFormData.pinned && !currentProject?.pinned) {
        const pinnedCount = projects.filter((p) => p.pinned).length;
        console.log("Pinned count:", pinnedCount);
        
        if (pinnedCount >= 6) {
          CustomToast.warning(
            "Maximum of 6 projects can be pinned. Please unpin some projects first."
          );
          setEditing(false);
          return;
        }
      }

      // Prepare update data
      const updateData: {
        id: string;
        title: string;
        description: string;
        demoLink: string;
        pinned: boolean;
        imageUrl?: string | null;
      } = {
        id: projectId,
        title: editFormData.title,
        description: editFormData.description,
        demoLink: editFormData.demoLink,
        pinned: editFormData.pinned,
      };

      // Only include imageUrl if it's defined
      if (imageUrl !== undefined) {
        updateData.imageUrl = imageUrl;
      }

      console.log("Sending update to API:", updateData);

      const res = await fetch("/api/projects", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      console.log("API Response status:", res.status);
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error("API Error response:", errorText);
        throw new Error(`HTTP error! status: ${res.status}, response: ${errorText}`);
      }

      const data = await res.json();
      console.log("API Response data:", data);

      if (data.success) {
        console.log("Edit successful, refreshing projects...");
        await fetchProjects();
        setEditingId(null);
        setEditFormData({
          title: "",
          description: "",
          demoLink: "",
          pinned: false,
        });
        setEditImagePreview(null);
        setEditSelectedImage(null);
        CustomToast.success("Project updated successfully!");
      } else {
        console.error("API returned error:", data.error);
        CustomToast.error(`Error updating project: ${data.error || "Unknown error"}`);
      }
    } catch (err: unknown) {
      console.error("Error updating project:", err);
      CustomToast.error(
        `Error updating project: ${
          err instanceof Error ? err.message : String(err)
        }`
      );
    } finally {
      console.log("=== EDIT SUBMIT FINISHED ===");
      setEditing(false);
    }
  };

  // Toggle pin status
  const togglePinProject = async (id: string, currentlyPinned: boolean) => {
    if (editingId === id) return;

    setPinningId(id);

    try {
      // Get the project being toggled
      const projectToToggle = projects.find((p) => p.id === id);
      if (!projectToToggle) {
        CustomToast.error("Project not found");
        return;
      }

      // Check pin limit if trying to pin
      if (!currentlyPinned) {
        const pinnedCount = projects.filter((p) => p.pinned).length;
        if (pinnedCount >= 6) {
          CustomToast.warning(
            "Maximum of 6 projects can be pinned. Please unpin some projects first."
          );
          return;
        }
      }

      // Update the project's pinned status
      const res = await fetch("/api/projects", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          pinned: !currentlyPinned,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      if (data.success) {
        // When pinning/unpinning, we need to recalculate all positions
        const updatedProjects = projects.map((p) => {
          if (p.id === id) {
            return { ...p, pinned: !currentlyPinned };
          }
          return p;
        });

        // Sort projects: pinned first, then by original position
        const pinnedProjects = updatedProjects.filter((p) => p.pinned);
        const unpinnedProjects = updatedProjects.filter((p) => !p.pinned);

        // Reassign positions
        const reorderedProjects = [
          ...pinnedProjects.map((p, index) => ({ ...p, position: index })),
          ...unpinnedProjects.map((p, index) => ({
            ...p,
            position: pinnedProjects.length + index,
          })),
        ];

        setProjects(reorderedProjects);

        // Save new positions to database
        await updatePositions(reorderedProjects);

        CustomToast.success(
          `Project ${!currentlyPinned ? "pinned" : "unpinned"} successfully!`
        );
      } else {
        CustomToast.error(`Error updating project: ${data.error}`);
      }
    } catch (err: unknown) {
      console.error("Error toggling pin:", err);
      CustomToast.error(
        `Error updating project: ${
          err instanceof Error ? err.message : String(err)
        }`
      );
    } finally {
      setPinningId(null);
    }
  };

  // Handle delete button click
  const handleDeleteClick = (
    id: string,
    title: string,
    e: React.MouseEvent
  ) => {
    if (editingId === id) return;

    e.stopPropagation();
    setProjectToDelete({ id, title });
    setShowDeletePopup(true);
  };

  // Confirm deletion
  const confirmDelete = async () => {
    if (!projectToDelete) return;

    setDeletingId(projectToDelete.id);

    try {
      const res = await fetch(`/api/projects?id=${projectToDelete.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      if (data.success) {
        // Remove from local state and refresh
        setProjects((prev) => prev.filter((p) => p.id !== projectToDelete.id));
        if (editingId === projectToDelete.id) {
          cancelEditing();
        }
        CustomToast.success("Project deleted successfully!");

        // Refresh to update positions
        await fetchProjects();
      } else {
        CustomToast.error(`Error deleting project: ${data.error}`);
      }
    } catch (err: unknown) {
      console.error("Error deleting project:", err);
      CustomToast.error(
        `Error deleting project: ${
          err instanceof Error ? err.message : String(err)
        }`
      );
    } finally {
      setDeletingId(null);
      setShowDeletePopup(false);
      setProjectToDelete(null);
    }
  };

  // Cancel deletion
  const cancelDelete = () => {
    setShowDeletePopup(false);
    setProjectToDelete(null);
    setDeletingId(null);
  };

  // Get pinned and unpinned projects (both sorted by position)
  const pinnedProjects = projects
    .filter((project) => project.pinned)
    .sort((a, b) => a.position - b.position);

  const unpinnedProjects = projects
    .filter((project) => !project.pinned)
    .sort((a, b) => a.position - b.position);

  // Debug test button
  const testEditFunctionality = () => {
    if (projects.length > 0) {
      console.log("=== TESTING EDIT FUNCTIONALITY ===");
      console.log("All projects:", projects);
      console.log("Pinned projects:", pinnedProjects);
      console.log("Unpinned projects:", unpinnedProjects);
      console.log("Editing ID:", editingId);
      console.log("Edit Form Data:", editFormData);
      
      // Test editing the first project
      const firstProject = projects[0];
      console.log("First project:", firstProject);
      startEditing(firstProject);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-blue-500">Projects</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow p-4 border-l-4 border-blue-500 animate-pulse"
            >
              <div className="h-6 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-md lg:text-2xl font-semibold text-blue-500">
            All Projects ({projects.length})
            {updatingPositions && (
              <span className="ml-2 text-sm text-blue-500 font-normal">
                (Saving positions...)
              </span>
            )}
          </h2>
          <div className="flex items-center space-x-4">
            <div className="text-sm hidden lg:block text-gray-600">
              {pinnedProjects.length}/6 projects pinned
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              disabled={editingId !== null || updatingPositions}
              className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              <Plus size={20} />
              <span>{showForm ? "Cancel" : "Add Project"}</span>
            </button>
            {/* Debug button - remove in production */}
            <button
              onClick={testEditFunctionality}
              className="px-3 py-1 text-xs bg-purple-500 text-white rounded hover:bg-purple-600"
            >
              Test Edit
            </button>
          </div>
        </div>

        {/* Add Project Form */}
        {showForm && (
          <div className="bg-white rounded-xl lg:shadow p-0 lg:p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4 text-blue-500">
              Add New Project
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Image Upload Section */}
              <div>
                {imagePreview ? (
                  <div className="relative mb-3">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      width={400}
                      height={200}
                      loading="lazy"
                      className="w-full h-48 object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={removeSelectedImage}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer"
                    onClick={() =>
                      document.getElementById("imageUpload")?.click()
                    }
                  >
                    <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600 mb-2">
                      Click to upload an image
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 5MB
                    </p>
                  </div>
                )}
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Name
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 lg:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter project name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full p-2 lg:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter project description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Demo Link
                </label>
                <input
                  type="url"
                  name="demoLink"
                  value={formData.demoLink}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 lg:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="pinned"
                  checked={formData.pinned}
                  onChange={handleInputChange}
                  disabled={pinnedProjects.length >= 6 && !formData.pinned}
                  className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
                />
                <label className="text-sm font-medium text-gray-700">
                  Pin this project to top{" "}
                  {pinnedProjects.length >= 6 && "(Max 6 reached)"}
                </label>
              </div>

              {/* Progress Bar */}
              {uploadProgress > 0 && (
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 flex items-center space-x-2"
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>
                      {uploadProgress > 0 ? "Uploading..." : "Adding..."}
                    </span>
                  </>
                ) : (
                  <>
                    <Plus size={16} />
                    <span>Add Project</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* ALL Projects Section with Drag and Drop */}
        <div className="space-y-8">
          {/* Pinned Projects Section with Drag and Drop */}
          {pinnedProjects.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4 text-blue-500 flex items-center">
                <Pin size={20} className="mr-2" />
                Pinned Projects ({pinnedProjects.length}/6)
                {isDragging && (
                  <span className="ml-2 text-sm text-gray-500 font-normal">
                    (Drag to reorder pinned projects)
                  </span>
                )}
              </h3>

              <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={pinnedProjects.map((p) => p.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {pinnedProjects.map((project) => (
                      <SortableProjectCard
                        key={project.id}
                        id={project.id}
                        project={project}
                        onDelete={handleDeleteClick}
                        onTogglePin={togglePinProject}
                        onEdit={startEditing}
                        onSaveEdit={handleEditSubmit}
                        onCancelEdit={cancelEditing}
                        editingId={editingId}
                        editFormData={editFormData}
                        onEditInputChange={handleEditInputChange}
                        onEditImageSelect={handleEditImageSelect}
                        editImagePreview={editImagePreview}
                        onRemoveEditImage={removeEditSelectedImage}
                        pinningId={pinningId}
                        deletingId={deletingId}
                        editing={editing}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </div>
          )}

          {/* Unpinned Projects Section with Drag and Drop */}
          {unpinnedProjects.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4 text-blue-500">
                All Projects ({unpinnedProjects.length})
                {isDragging && (
                  <span className="ml-2 text-sm text-gray-500 font-normal">
                    (Drag to reorder projects)
                  </span>
                )}
              </h3>

              <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={unpinnedProjects.map((p) => p.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {unpinnedProjects.map((project) => (
                      <SortableProjectCard
                        key={project.id}
                        id={project.id}
                        project={project}
                        onDelete={handleDeleteClick}
                        onTogglePin={togglePinProject}
                        onEdit={startEditing}
                        onSaveEdit={handleEditSubmit}
                        onCancelEdit={cancelEditing}
                        editingId={editingId}
                        editFormData={editFormData}
                        onEditInputChange={handleEditInputChange}
                        onEditImageSelect={handleEditImageSelect}
                        editImagePreview={editImagePreview}
                        onRemoveEditImage={removeEditSelectedImage}
                        pinningId={pinningId}
                        deletingId={deletingId}
                        editing={editing}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </div>
          )}

          {projects.length === 0 && (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 mb-4">
                <ImageIcon size={48} className="mx-auto" />
              </div>
              <p className="text-gray-500 text-lg">No projects yet</p>
              <p className="text-gray-400">
                Click &apos;Add Project&apos; to create your first project
              </p>
            </div>
          )}
        </div>

        <DragOverlay>
          {activeId ? (
            <div className="opacity-80 rotate-2">
              <ProjectCard
                project={projects.find((p) => p.id === activeId)!}
                onDelete={handleDeleteClick}
                onTogglePin={togglePinProject}
                onEdit={startEditing}
                onSaveEdit={handleEditSubmit}
                onCancelEdit={cancelEditing}
                editingId={editingId}
                editFormData={editFormData}
                onEditInputChange={handleEditInputChange}
                onEditImageSelect={handleEditImageSelect}
                editImagePreview={editImagePreview}
                onRemoveEditImage={removeEditSelectedImage}
                pinningId={pinningId}
                deletingId={deletingId}
                editing={editing}
              />
            </div>
          ) : null}
        </DragOverlay>

        {/* Delete Confirmation Popup */}
        {showDeletePopup && projectToDelete && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-scale-in">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="text-red-500" size={24} />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Delete Project
                  </h3>
                </div>
                <button
                  onClick={cancelDelete}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <p className="text-gray-600 mb-1">
                Are you sure you want to delete the project{" "}
                <strong>&apos;{projectToDelete.title}&apos;</strong>?
              </p>
              <p className="text-sm text-gray-500 mb-6">
                This action cannot be undone. The project will be permanently
                removed.
              </p>

              <div className="flex space-x-3 justify-end">
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={deletingId === projectToDelete.id}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center space-x-2 disabled:opacity-50"
                >
                  {deletingId === projectToDelete.id ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Trash2 size={16} />
                  )}
                  <span>Delete Project</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}