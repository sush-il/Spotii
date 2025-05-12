import '../utils/audioPlayer.css';
const AudioPreview = ({ previewURL }: { previewURL: string }) => {
  return (
    <div className="row">
      <audio controls autoPlay muted loop>
        <source src={previewURL} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPreview;
