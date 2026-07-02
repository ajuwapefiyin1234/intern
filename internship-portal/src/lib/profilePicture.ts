export const MAX_PROFILE_PHOTO_SIZE = 1.5 * 1024 * 1024; // 1.5MB - keeps localStorage usage reasonable

type ProfilePictureCallbacks = {
  onSuccess: (dataUrl: string) => void;
  onError: (message: string) => void;
};

/**
 * Validates a picked image file (type + size) and reads it to a base64 data
 * URL. Shared by every place in the app that lets someone set a profile
 * photo, so the rules stay consistent in one place.
 */
export function readAndValidateProfilePicture(
  file: File,
  { onSuccess, onError }: ProfilePictureCallbacks
) {
  if (!file.type.startsWith("image/")) {
    onError("Please choose an image file.");
    return;
  }

  if (file.size > MAX_PROFILE_PHOTO_SIZE) {
    onError("That image is too large. Please choose one under 1.5MB.");
    return;
  }

  const reader = new FileReader();
  reader.onloadend = () => {
    onSuccess(reader.result as string);
  };
  reader.onerror = () => {
    onError("Couldn't read that file. Please try a different image.");
  };
  reader.readAsDataURL(file);
}
