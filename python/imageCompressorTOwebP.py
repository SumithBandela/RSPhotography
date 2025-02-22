import os
import shutil
import time
from watchdog.observers import Observer  # For monitoring the directory
from watchdog.events import FileSystemEventHandler  # Handles file events
from PIL import Image  # For image conversion

class ImageHandler(FileSystemEventHandler):
    """
    Watches for new image files in the directory, 
    converts them to WEBP format, and moves the original files to 'Archive'.
    """
    
    # Supported image formats
    SUPPORTED_EXTENSIONS = ('.jpg', '.jpeg', '.png', '.bmp', '.tiff', '.gif')

    def __init__(self, directory):
        self.directory = directory
        self.archive_dir = os.path.join("C:/codeBaseDevelopment/RSPhotography/public", "Archive")

        # Create Archive directory if it doesn't exist
        os.makedirs(self.archive_dir, exist_ok=True)

    def process_image(self, file_path):
        """
        Converts an image file (JPG, JPEG, PNG, BMP, TIFF, GIF) to WEBP 
        and moves the original file to the 'Archive' folder.
        """
        if not file_path.lower().endswith(self.SUPPORTED_EXTENSIONS):  # Only process supported files
            return
        
        webp_path = os.path.splitext(file_path)[0] + '.webp'  # Set new file path with .webp extension
        retry_attempts = 3  # Number of retry attempts for permission issues

        for attempt in range(retry_attempts):
            try:
                time.sleep(1)  # Small delay to allow the file to be fully written

                # Open and convert the image
                with Image.open(file_path) as image:
                    image.save(webp_path, 'webp', quality=80)
                print(f"✅ Converted: {file_path} -> {webp_path}")

                # Move the original image to the Archive folder
                archive_path = os.path.join(self.archive_dir, os.path.basename(file_path))
                shutil.move(file_path, archive_path)
                print(f"📂 Moved to Archive: {file_path} -> {archive_path}")

                return  # Exit the loop if successful

            except PermissionError as e:
                print(f"⚠️ Permission denied ({file_path}). Retrying ({attempt + 1}/{retry_attempts})...")
                time.sleep(2)  # Wait before retrying

            except Exception as e:
                print(f"❌ Error processing {file_path}: {e}")
                return  # Exit if another error occurs

        print(f"❌ Skipping file due to repeated permission errors: {file_path}")

    def on_created(self, event):
        """
        Triggered when a new file is added to the directory.
        Calls process_image() if the file is a supported image format.
        """
        if not event.is_directory:
            self.process_image(event.src_path)
        else:
            # If a new directory is created, start monitoring it
            monitor_directory(event.src_path)

def monitor_directory(directory):
    """
    Monitors a directory for new images and processes them in real-time.
    """
    event_handler = ImageHandler(directory)  # Create an event handler
    observer = Observer()  # Initialize an observer
    observer.schedule(event_handler, directory, recursive=True)  # Start monitoring the directory
    observer.start()

    print(f"👀 Watching directory: {directory} for new images...")

    try:
        while True:
            time.sleep(1)  # Keep the script running indefinitely
    except KeyboardInterrupt:
        observer.stop()  # Stop the observer on user interruption (CTRL+C)
        print("\n🛑 Stopped monitoring.")
    
    observer.join()  # Ensure the observer thread stops gracefully

if __name__ == "__main__":
    directory = r"C:/codeBaseDevelopment/RSPhotography/public/images"  # Set your target directory
    monitor_directory(directory)  # Start monitoring