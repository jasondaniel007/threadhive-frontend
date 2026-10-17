import { Container } from "react-bootstrap";
import './ThreadList.css';


export default function ThreadList({ threads, onSelect }) {
  const handleUpvote = () => {
    alert('Upvote clicked!');
  };
  const handleDownvote = () => {
    alert('Downvote clicked!');
  };

  return (
    <Container fluid className="px-0">
      {/* Your Code Here  */}
      <threadlist>
        {threads.map((thread) => (
          <div key={thread.id} className="thread-item">
            <h5>{thread.title}</h5>
            <p>{thread.content}</p>
            <button onClick={handleUpvote}>Upvote</button>
            <button onClick={handleDownvote}>Downvote</button>
          </div>
        ))}
      </threadlist>
    </Container>
  );
}
