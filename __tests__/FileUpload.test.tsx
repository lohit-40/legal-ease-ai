import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import FileUpload from '../src/components/FileUpload';

describe('FileUpload Component', () => {
  const mockOnUpload = jest.fn();

  beforeEach(() => {
    mockOnUpload.mockClear();
  });

  it('renders without crashing', () => {
    render(<FileUpload onUpload={mockOnUpload} />);
    expect(screen.getByText(/Drag & drop your file here/i)).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<FileUpload onUpload={mockOnUpload} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('shows error for invalid file type', () => {
    render(<FileUpload onUpload={mockOnUpload} />);
    
    const input = screen.getByLabelText(/Upload a legal document/i);
    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    
    fireEvent.change(input, { target: { files: [file] } });
    
    expect(screen.getByText(/Please upload a valid PDF or Text file/i)).toBeInTheDocument();
    expect(mockOnUpload).not.toHaveBeenCalled();
  });

  it('calls onUpload for valid txt file', () => {
    render(<FileUpload onUpload={mockOnUpload} />);
    
    const input = screen.getByLabelText(/Upload a legal document/i);
    const file = new File(['document content'], 'doc.txt', { type: 'text/plain' });
    
    fireEvent.change(input, { target: { files: [file] } });
    
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(mockOnUpload).toHaveBeenCalledWith(file);
  });
});
