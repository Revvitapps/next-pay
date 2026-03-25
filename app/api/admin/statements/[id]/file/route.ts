import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getStatementRecord, updateStatementFileMetadata } from '@/lib/admin/repository';
import { isAdminAuthenticated } from '@/lib/admin/auth';
import { getSignedStatementDownloadUrl } from '@/lib/server/storage/blobStorage';

export const runtime = 'nodejs';

type RouteProps = {
  params: Promise<{ id: string }>;
};

export async function GET(_: Request, { params }: RouteProps) {
  const cookieStore = await cookies();
  if (!isAdminAuthenticated(cookieStore)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const statement = await getStatementRecord(id);

  if (!statement || !statement.storageReference) {
    return NextResponse.json({ error: 'Statement file unavailable.' }, { status: 404 });
  }

  const signedUrl = await getSignedStatementDownloadUrl(statement.storageReference);
  if (!signedUrl) {
    return NextResponse.json({ error: 'Unable to generate secure file URL.' }, { status: 502 });
  }

  await updateStatementFileMetadata({
    statementId: statement.id,
    storageReference: statement.storageReference,
    signedDownloadUrl: signedUrl,
    fileStatus: statement.fileStatus,
    originalFileName: statement.originalFileName,
    contentType: statement.contentType,
    fileSize: statement.fileSize,
    uploadedAt: statement.uploadedAt
  });

  return NextResponse.redirect(signedUrl, { status: 302 });
}
