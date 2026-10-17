import { Card, Container, Button } from 'react-bootstrap';
import VoteButtons from '../Shared/VoteButtons';
import './ThreadList.css';


export default function ThreadList({ threads, onSelect }) {
  return (
    <Container fluid className="px-0">
      <div className="thread-list">
        {threads.map((thread) => (
          <Card key={thread._id} className="thread-card">
            <Card.Body className="thread-card-body">
              <div className="vote-section">
                <VoteButtons
                  count={thread.upvotes - thread.downvotes}
                  onUpvote={() => alert('Upvote clicked!')}
                  onDownvote={() => alert('Downvote clicked!')}
                  btnClassName="vote-btn"
                  countClassName="vote-count"
                />
              </div>

              <div className="thread-content-section">
                <div className="thread-header">
                  <Card.Title className="thread-title">{thread.title}</Card.Title>
                  <span className="subreddit-badge">r/{thread.subreddit}</span>
                </div>
                <Card.Text className="thread-text">{thread.content}</Card.Text>
                <Button
                  variant="link"
                  className="view-thread-btn"
                  onClick={() => onSelect(thread)}
                >
                  View thread <i className="bi bi-arrow-right" aria-hidden="true"></i>
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
}
