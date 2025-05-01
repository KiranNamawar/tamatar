/**
 * Link database operations
 *
 * This module provides functions for interacting with the Link model in the database.
 * It uses the shared Prisma client instance and implements consistent error handling.
 */
import { prisma } from '../client';
import { Link, Prisma } from '@/generated/prisma';
import { throwAppError } from '@/utils/error';
import logger from '@/utils/logger';
import { Return } from '@/types/return';

/**
 * Logger instance scoped to this file for consistent logging context
 */
const log = logger.child({ file: 'src/lib/db/tmtr/link.ts' });

/**
 * Create a new link
 *
 * @param linkData - The link data to create
 * @returns A Return object with the created link data or error information
 */
export async function createLink(
    linkData: Prisma.LinkCreateInput,
): Promise<Return<Link>> {
    try {
        const link = await prisma.link.create({
            data: linkData,
        });
        log.info({ linkId: link.id }, 'Link created successfully');
        return { success: true, data: link };
    } catch (error) {
        throwAppError('createLink', 'Failed to create link', log, error);
    }
}

/**
 * Get a link by its ID
 *
 * @param id - The link ID to search for
 * @returns A Return object with the link data or error information
 */
export async function getLinkById(id: string): Promise<Return<Link>> {
    try {
        const link = await prisma.link.findUnique({
            where: { id },
        });
        if (!link) {
            log.warn({ id }, 'Link not found by ID');
            return { success: false, error: 'Link not found' };
        }
        return { success: true, data: link };
    } catch (error) {
        throwAppError(
            'getLinkById',
            `Failed to get link by ID: ${id}`,
            log,
            error,
        );
    }
}

/**
 * Get a link by its alias and user ID
 *
 * @param alias - The alias of the link
 * @param userId - The user ID associated with the link
 * @returns A Return object with the link data or error information
 */
export async function getLinkByAlias(
    alias: string,
    userId: string,
): Promise<Return<Link>> {
    try {
        const link = await prisma.link.findFirst({
            where: { alias, userId },
        });
        if (!link) {
            log.warn({ alias, userId }, 'Link not found by alias and userId');
            return { success: false, error: 'Link not found' };
        }
        return { success: true, data: link };
    } catch (error) {
        throwAppError(
            'getLinkByAlias',
            `Failed to get link by alias: ${alias}`,
            log,
            error,
        );
    }
}

/**
 * Update an existing link
 *
 * @param id - The ID of the link to update
 * @param linkData - The link data to update
 * @returns A Return object with the updated link data or error information
 */
export async function updateLink(
    id: string,
    linkData: Prisma.LinkUpdateInput,
): Promise<Return<Link>> {
    try {
        const link = await prisma.link.update({
            where: { id },
            data: linkData,
        });
        log.info({ linkId: id }, 'Link updated successfully');
        return { success: true, data: link };
    } catch (error) {
        throwAppError(
            'updateLink',
            `Failed to update link with ID: ${id}`,
            log,
            error,
        );
    }
}

/**
 * Delete a link by its ID
 *
 * @param id - The ID of the link to delete
 * @returns A Return object with success status or error information
 */
export async function deleteLink(id: string): Promise<Return<{ id: string }>> {
    try {
        await prisma.link.delete({
            where: { id },
        });
        log.info({ linkId: id }, 'Link deleted successfully');
        return { success: true, data: { id } };
    } catch (error) {
        throwAppError(
            'deleteLink',
            `Failed to delete link with ID: ${id}`,
            log,
            error,
        );
    }
}

/**
 * Increment the click count for a link
 *
 * @param id - The ID of the link to increment the click count for
 * @returns A Return object with success status or error information
 */
export async function incrementClickCount(id: string): Promise<Return<void>> {
    try {
        await prisma.link.update({
            where: { id },
            data: { clickCount: { increment: 1 } },
        });
        log.info({ linkId: id }, 'Click count incremented');
        return { success: true };
    } catch (error) {
        throwAppError(
            'incrementClickCount',
            `Failed to increment click count for link ID: ${id}`,
            log,
            error,
        );
    }
}
