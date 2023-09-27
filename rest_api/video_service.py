# import apivideo
# from apivideo.apis import VideosApi
#
# api_key = "8kn11mC7wSnjZavcpdRtaw7p2Wwj1ZdDQyXyRvdUjHI"
#
# with apivideo.AuthenticatedApiClient(api_key) as client:
#     # if you rather like to use the sandbox environment:
#     # with apivideo.AuthenticatedApiClient(api_key, production=False) as client:
#
#     videos_api = VideosApi(client)
#     videos = videos_api.list()
#     v = videos_api.get('vi20lHKA6F2j69wVDyWoRFNM')
#     p = 1


import cv2
import apivideo
from apivideo.apis import VideosApi
import requests
# from apivideo import ApiVideoClient

# Initialize the api.video client with your API key
api_key = '8kn11mC7wSnjZavcpdRtaw7p2Wwj1ZdDQyXyRvdUjHI'
with apivideo.AuthenticatedApiClient(api_key) as client:

    # Replace 'YOUR_VIDEO_ID' with the actual video ID
    video_id = 'vi20lHKA6F2j69wVDyWoRFNM'

    # Step 1: Retrieve the Video Information
    # video_info = client.videos.get(video_id)
    videos_api = VideosApi(client)
    video_info = videos_api.get('vi20lHKA6F2j69wVDyWoRFNM')

    # Extract the asset ID
    video_source_url = video_info.assets.mp4

    response = requests.get(video_source_url, stream=True)

    if response.status_code == 200:
        # Save the video to a local file
        with open('downloaded_video.mp4', 'wb') as f:
            for chunk in response.iter_content(chunk_size=1024):
                if chunk:
                    f.write(chunk)

        # OpenCV VideoCapture to read the downloaded video
        cap = cv2.VideoCapture('downloaded_video.mp4')

        while True:
            # Read a frame from the video
            ret, frame = cap.read()

            # Check if the video has ended
            if not ret:
                break

            # Process the frame using OpenCV (e.g., perform image processing or analysis)
            # ...

            # Display the frame (optional)
            cv2.imshow('Video Frame', frame)

            # Exit when 'q' is pressed
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

        # Release the VideoCapture and close the OpenCV window
        cap.release()
        cv2.destroyAllWindows()

    else:
        print(f"Failed to download video. Status code: {response.status_code}")
