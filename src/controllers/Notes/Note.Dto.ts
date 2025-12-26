export interface CreateNoteDto {
  title: string;
  content?: string;
  status_id?: number;
}

export interface UpdateNoteDto {
  title?: string;
  content?: string;
  status_id?: number;
}

export interface NoteResponseDto {
  id: number;
  title: string;
  current_version_id: number;
  status_id: string;
  author_id: number;
  created_at: Date;
  updated_at: Date;
}
