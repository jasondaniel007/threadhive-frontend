import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import ThreadCard from '../../../src/components/ThreadList/ThreadCard';
import { getUserName } from '../../../src/services/userService';

vi.mock('../../../src/services/userService', () => ({
  getUserName: vi.fn(),
}));

const baseThread = {
  title: 'Hello Hive',
  content: 'This is the thread body.',
  author: 'user-1',
  subredditName: 'reactjs',
  upvotedBy: ['a', 'b', 'c'],
  downvotedBy: ['d'],
};

describe('ThreadCard', () => {
  beforeEach(() => {
    getUserName.mockReturnValue('Alice');
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
  });

  describe('rendering', () => {
    it('renders title, content, author and subreddit', () => {
      render(<ThreadCard thread={baseThread} goBack={vi.fn()} />);

      expect(screen.getByRole('heading', { level: 3, name: 'Hello Hive' })).toBeInTheDocument();
      expect(screen.getByText('This is the thread body.')).toBeInTheDocument();
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.getByText('r/reactjs')).toBeInTheDocument();
    });

    it('renders back, upvote and downvote buttons', () => {
      render(<ThreadCard thread={baseThread} goBack={vi.fn()} />);

      expect(screen.getByRole('button', { name: /back to home/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Upvote' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Downvote' })).toBeInTheDocument();
    });
  });

  describe('props', () => {
    it('looks up the author name using thread.author', () => {
      render(<ThreadCard thread={baseThread} goBack={vi.fn()} />);

      expect(getUserName).toHaveBeenCalledWith('user-1');
    });

    it('shows upvotes minus downvotes as the vote count', () => {
      render(<ThreadCard thread={baseThread} goBack={vi.fn()} />);

      expect(screen.getByText('2')).toBeInTheDocument();
    });

    it('shows a negative count when downvotes exceed upvotes', () => {
      const thread = { ...baseThread, upvotedBy: [], downvotedBy: ['x', 'y', 'z'] };
      render(<ThreadCard thread={thread} goBack={vi.fn()} />);

      expect(screen.getByText('-3')).toBeInTheDocument();
    });

    it('shows zero when there are no votes', () => {
      const thread = { ...baseThread, upvotedBy: [], downvotedBy: [] };
      render(<ThreadCard thread={thread} goBack={vi.fn()} />);

      expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('renders different thread data', () => {
      getUserName.mockReturnValue('Bob');
      const thread = { ...baseThread, title: 'Other', content: 'Other body', subredditName: 'vitest' };
      render(<ThreadCard thread={thread} goBack={vi.fn()} />);

      expect(screen.getByRole('heading', { name: 'Other' })).toBeInTheDocument();
      expect(screen.getByText('Other body')).toBeInTheDocument();
      expect(screen.getByText('Bob')).toBeInTheDocument();
      expect(screen.getByText('r/vitest')).toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('calls goBack when the back button is clicked', async () => {
      const user = userEvent.setup();
      const goBack = vi.fn();
      render(<ThreadCard thread={baseThread} goBack={goBack} />);

      await user.click(screen.getByRole('button', { name: /back to home/i }));

      expect(goBack).toHaveBeenCalledTimes(1);
    });

    it('alerts when the upvote button is clicked', async () => {
      const user = userEvent.setup();
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
      render(<ThreadCard thread={baseThread} goBack={vi.fn()} />);

      await user.click(screen.getByRole('button', { name: 'Upvote' }));

      expect(alertSpy).toHaveBeenCalledWith('Upvote clicked!');
    });

    it('alerts when the downvote button is clicked', async () => {
      const user = userEvent.setup();
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
      render(<ThreadCard thread={baseThread} goBack={vi.fn()} />);

      await user.click(screen.getByRole('button', { name: 'Downvote' }));

      expect(alertSpy).toHaveBeenCalledWith('Downvote clicked!');
    });
  });
});
