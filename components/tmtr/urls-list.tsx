'use client';

import { Button, Card, Grid, Group } from '@mantine/core';
import { Url } from '@prisma/client';
import { IconExternalLink } from '@tabler/icons-react';
import Link from 'next/link';

export default function TmtrUrlsList({ urls }: { urls: Url[] }) {
    return (
        <section className="rounded-lg p-4">
            <Group className='mb-4'>
                <h2 className="mb-4 text-2xl font-bold">URLs</h2>
                <Link href="/tmtr/urls/create">
                    <Button variant="outline" color="blue" className="ml-auto">
                        Create URL
                    </Button>
                </Link>
            </Group>
            {urls.length > 0 ? (
                <Grid gutter={16} className="p-4 bg-inherit rounded-lg">
                    {urls.map((url) => (
                        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}
                            key={url.id}
                            className="mb-2 p-4 transition duration-200"
                        >
                            <Group className="mb-2">
                                <li className="text-lg font-semibold">
                                    {url.shortCode}
                                </li>
                                <a
                                    href={`https://tmtr.xyz/${url.shortCode}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <IconExternalLink
                                        size={20}
                                        className="text-blue-500"
                                    />
                                </a>
                            </Group>
                            <p className="text-gray-600">{url.originalUrl}</p>
                            <p className="text-gray-600">
                                {url.createdAt.toLocaleDateString()}
                            </p>
                            <Button
                                variant="outline"
                                color="blue"
                                className="mt-2"
                            >
                                <Link href={`/tmtr/urls/${url.shortCode}`}>
                                    View Details
                                </Link>
                            </Button>
                        </Grid.Col>
                    ))}
                </Grid>
            ) : (
                <p className="text-gray-500">No URLs found.</p>
            )}
        </section>
    );
}
