"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  ExternalLink,
  Image as ImageIcon,
  Upload,
  X,
  AlertTriangle,
  Pin,
  PinOff,
  Edit,
  Save,
} from "lucide-react";
import Image from "next/image";

interface Project {
  id: string;
  title: string;
  description: string;
  demoLink: string;
  image?: string;
  pinned: boolean;
  createdAt: string;
}

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

  // Fetch projects from Supabase
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/projects");
      const data = await res.json();

      if (data.success) {
        setProjects(data.projects);
      } else {
        console.error("Error fetching projects:", data._error);
      }
    } catch (_error) {
      console.error("Error fetching projects:", _error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  // Handle edit form input changes
  const handleEditInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setEditFormData({
      ...editFormData,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  // Handle image selection for add form
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file (JPEG, PNG, GIF, etc.)");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("Please select an image smaller than 5MB");
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
        alert("Please select an image file (JPEG, PNG, GIF, etc.)");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("Please select an image smaller than 5MB");
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

  // Remove selected image from edit form
  // (duplicate removed)

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
    const formData = new FormData();
    formData.append("file", file);

    const uploadResponse = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const uploadData = await uploadResponse.json();

    if (!uploadData.success) {
      throw new Error(uploadData.error);
    }

    return uploadData.publicUrl;
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
          alert(
            "Maximum of 6 projects can be pinned. Please unpin some projects first."
          );
          return;
        }
      }

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
        }),
      });

      const data = await res.json();

      if (data.success) {
        setProjects((prev) => [data.project, ...prev]);
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
        fetchProjects(); // Refetch to maintain order
      } else {
        alert(`Error creating project: ${data.error}`);
      }
    } catch (error) {
      console.error("Error creating project:", error);
      alert("Error creating project. Please try again.");
    } finally {
      setSubmitting(false);
      setUploadProgress(0);
    }
  };

  // Start editing a project
  const startEditing = (project: Project) => {
    setEditingId(project.id);
    setEditFormData({
      title: project.title,
      description: project.description,
      demoLink: project.demoLink,
      pinned: project.pinned,
    });
    setEditImagePreview(project.image || null);
    setEditSelectedImage(null);
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
  // Handle form submission for editing project
  const handleEditSubmit = async (projectId: string) => {
    setEditing(true);

    try {
      let imageUrl: string | null | undefined = undefined;

      // Handle image logic
      if (editSelectedImage) {
        // New image selected - upload it
        console.log("Uploading new image...");
        imageUrl = await uploadImageToStorage(editSelectedImage);
        console.log("Image uploaded:", imageUrl);
      } else if (editImagePreview === null) {
        // User removed the image - set to null to remove from database
        imageUrl = null;
        console.log("Image removed by user");
      } else {
        // No change to image - don't send imageUrl (undefined)
        console.log("No image change - keeping existing image");
        imageUrl = undefined;
      }

      // Check pin limit if trying to pin
      const currentProject = projects.find((p) => p.id === projectId);
      if (editFormData.pinned && !currentProject?.pinned) {
        const pinnedCount = projects.filter((p) => p.pinned).length;
        if (pinnedCount >= 6) {
          alert(
            "Maximum of 6 projects can be pinned. Please unpin some projects first."
          );
          return;
        }
      }

      interface UpdateProjectPayload {
        id: string;
        title: string;
        description: string;
        demoLink: string;
        pinned: boolean;
        imageUrl?: string | null;
      }

      const updateData: UpdateProjectPayload = {
        id: projectId,
        title: editFormData.title,
        description: editFormData.description,
        demoLink: editFormData.demoLink,
        pinned: editFormData.pinned,
      };

      // Only include imageUrl if it's defined (not undefined)
      if (imageUrl !== undefined) {
        updateData.imageUrl = imageUrl;
      }

      console.log("Sending PATCH request with data:", updateData);

      const res = await fetch("/api/projects", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      const data = await res.json();
      console.log("API response:", data);

      if (data.success) {
        console.log("Project updated successfully");
        setProjects((prev) =>
          prev.map((project) =>
            project.id === projectId ? data.project : project
          )
        );
        setEditingId(null);

        // Show success message
        alert("Project updated successfully!");

        // Refetch to ensure data is synced
        fetchProjects();
      } else {
        console.error("API error:", data.error);
        alert(`Error updating project: ${data.error}`);
      }
    } catch (error) {
      console.error("Error updating project:", error);
      alert(
        "Error updating project. Please try again. Check console for details."
      );
    } finally {
      setEditing(false);
    }
  };
  // Toggle pin status
  const togglePinProject = async (id: string, currentlyPinned: boolean) => {
    if (editingId === id) return; // Don't allow pinning while editing

    setPinningId(id);

    try {
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

      const data = await res.json();

      if (data.success) {
        setProjects((prev) =>
          prev.map((project) =>
            project.id === id
              ? { ...project, pinned: !currentlyPinned }
              : project
          )
        );

        setTimeout(() => {
          fetchProjects();
        }, 100);
      } else {
        alert(`Error updating project: ${data._error}`);
      }
    } catch (_error) {
      alert("Error updating project. Please try again.");
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
    if (editingId === id) return; // Don't allow deletion while editing

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

      const data = await res.json();

      if (data.success) {
        setProjects((prev) =>
          prev.filter((project) => project.id !== projectToDelete.id)
        );
        if (editingId === projectToDelete.id) {
          cancelEditing();
        }
      } else {
        alert(`Error deleting project: ${data.error}`);
      }
    } catch {
      alert("Error deleting project. Please try again.");
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

  // Get pinned and unpinned projects
  const pinnedProjects = projects.filter((project) => project.pinned);
  const unpinnedProjects = projects.filter((project) => !project.pinned);

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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-md lg:text-2xl block lg:block font-semibold text-blue-500">
          All Projects ({unpinnedProjects.length})
        </h2>
        <div className="flex items-center space-x-4">
          <div className="text-sm hidden lg:block text-gray-600">
            {pinnedProjects.length}/6 projects pinned
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            disabled={editingId !== null}
            className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
          >
            <Plus size={20} />
            <span>{showForm ? "Cancel" : "Add Project"}</span>
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
                    width={600}
                    height={600}
                    className="w-full h-48 object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={removeEditSelectedImage}
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

      {/* Pinned Projects Section */}
      {pinnedProjects.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 text-blue-500 flex items-center">
            <Pin size={20} className="mr-2" />
            Pinned Projects ({pinnedProjects.length}/6)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {pinnedProjects.map((project) => (
              <ProjectCard
                key={project.id}
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
        </div>
      )}

      {/* All Projects Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-blue-500">
          {/* All Projects ({unpinnedProjects.length}) */}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 mb-4">
                <ImageIcon size={48} className="mx-auto" />
              </div>
              <p className="text-gray-500 text-lg">No projects yet</p>
              <p className="text-gray-400">
                Click &apos;Add Project&apos; to create your first project
              </p>
            </div>
          ) : (
            unpinnedProjects.map((project) => (
              <ProjectCard
                key={project.id}
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
            ))
          )}
        </div>
      </div>

      {/* Delete Confirmation Popup */}
      {showDeletePopup && projectToDelete && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs bg-opacity-50 flex items-center justify-center z-50 p-4">
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
  );
}

// Updated Project Card Component with Edit functionality
function ProjectCard({
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
}: {
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
}) {
  const isEditing = editingId === project.id;

  if (isEditing) {
    return (
      <div className="bg-white rounded-xl shadow-lg border-2 border-blue-500 relative">
        {/* Edit Form */}
        <div className="p-4">
          {/* Image Upload for Edit */}
          <div className="mb-4">
            {editImagePreview ? (
              <div className="relative mb-3">
                <Image
                  src={editImagePreview}
                  alt="Preview"
                  width={600}
                  height={600}
                  className="w-full h-32 object-cover rounded-lg border"
                />
                <button
                  type="button"
                  onClick={onRemoveEditImage}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                >
                  <X size={12} />
                </button>
              </div>
            ) : (
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors cursor-pointer"
                onClick={() =>
                  document
                    .getElementById(`editImageUpload-${project.id}`)
                    ?.click()
                }
              >
                <Upload className="mx-auto h-6 w-6 text-gray-400 mb-1" />
                <p className="text-xs text-gray-600">Change image</p>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
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

          <input
            type="text"
            name="title"
            value={editFormData.title}
            onChange={onEditInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Project title"
          />

          <textarea
            name="description"
            value={editFormData.description}
            onChange={onEditInputChange}
            rows={3}
            className="w-full p-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Project description"
          />

          <input
            type="url"
            name="demoLink"
            value={editFormData.demoLink}
            onChange={onEditInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Demo URL"
          />

          <div className="flex items-center space-x-2 mb-3">
            <input
              type="checkbox"
              name="pinned"
              checked={editFormData.pinned}
              onChange={onEditInputChange}
              className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
            />
            <label className="text-sm font-medium text-gray-700">
              Pin project
            </label>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => onSaveEdit(project.id)}
              disabled={editing}
              className="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-1"
            >
              {editing ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Save size={14} />
              )}
              <span className="text-sm">Save</span>
            </button>
            <button
              onClick={onCancelEdit}
              disabled={editing}
              className="flex-1 bg-gray-500 text-white px-3 py-2 rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow border-l-4 border-blue-500 relative">
      {/* Pin Indicator */}
      {project.pinned && (
        <div className="absolute top-2 left-2 bg-blue-500 text-white p-1 rounded-full z-10">
          <Pin size={14} />
        </div>
      )}

      {project.image && (
        <div className="h-48 bg-gray-200 rounded-t-xl overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            width={600}
            height={600}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      )}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-gray-900">
            {project.title}
          </h3>
          <div className="flex space-x-1">
            {/* Edit Button */}
            <button
              onClick={() => onEdit(project)}
              disabled={editingId !== null}
              className="text-blue-500 hover:text-blue-500 p-1 disabled:opacity-50"
              title="Edit project"
            >
              <Edit size={16} />
            </button>

            {/* Pin/Unpin Button */}
            <button
              onClick={() => onTogglePin(project.id, project.pinned)}
              disabled={pinningId === project.id || editingId !== null}
              className={`p-1 rounded ${
                project.pinned
                  ? "text-yellow-500 hover:text-yellow-700"
                  : "text-gray-400 hover:text-gray-600"
              } disabled:opacity-50`}
              title={project.pinned ? "Unpin project" : "Pin project to top"}
            >
              {pinningId === project.id ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
              ) : project.pinned ? (
                <PinOff size={16} />
              ) : (
                <Pin size={16} />
              )}
            </button>

            {/* Delete Button */}
            <button
              onClick={(e) => onDelete(project.id, project.title, e)}
              disabled={deletingId === project.id || editingId !== null}
              className="text-red-500 hover:text-red-700 p-1 disabled:opacity-50"
              title="Delete project"
            >
              {deletingId === project.id ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
              ) : (
                <Trash2 size={16} />
              )}
            </button>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {project.description}
        </p>

        <div className="flex justify-between items-center">
          <a
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-blue-500 hover:text-blue-800 text-sm"
          >
            <ExternalLink size={14} />
            <span>View Demo</span>
          </a>
          <span className="text-xs text-gray-400">
            {new Date(project.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}
