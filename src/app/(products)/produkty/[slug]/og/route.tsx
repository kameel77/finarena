import ProductOpenGraphImage from '../opengraph-image';

export async function GET(
  _req: Request,
  context: { params: { slug: string } }
) {
  return ProductOpenGraphImage({ params: context.params });
}
